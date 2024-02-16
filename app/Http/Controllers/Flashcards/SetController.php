<?php

namespace App\Http\Controllers\Flashcards;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreNewSetRequest;
use App\Http\Requests\UpdateSetRequest;
use App\Http\Resources\DictionaryResource;
use App\Models\FlashcardSets;
use App\Models\FlashcardsSetsProgress;
use App\Models\Translations;
use App\Providers\RouteServiceProvider;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;
use Inertia\Response;

class SetController extends Controller
{
    public function showSet(int $id, string $title): Response
    {
        return Inertia::render('Flashcards/SetInfo', [
            'set' => FlashcardSets::find($id),
            'translations' => FlashcardSets::getAllTranslations($title),
            'progression' => FlashcardsSetsProgress::getSetProgress($id, Auth::id()),
            'author' => FlashcardSets::getAuthorName($id),
            'translationsCount' => FlashcardSets::countTranslations($title)
        ]);
    }

    public function showEdit(int $id, string $title): Response
    {
        return Inertia::render('Flashcards/EditSet', [
            'set' => FlashcardSets::find($id),
            'translations' => FlashcardSets::getAllTranslations($title)
        ]);
    }

    public function showNewSet(): Response
    {
        return Inertia::render('Flashcards/CreateSet', [
            'message' => session('message')
        ]);
    }

    public function store(StoreNewSetRequest $request): RedirectResponse {
        // Store new set
        $flashcardSet = new FlashcardSets;

        $title = trim($request->title);
        $title = str_replace(' ', '_', $title);
        $languages = $request->languages;

        $flashcardSet->title = $title;
        $flashcardSet->description = trim($request->description);
        $flashcardSet->languages = json_encode($languages);

        $user = Auth::user();
        $user->sets()->save($flashcardSet);

        $translationsWithStatuses = [];

        // Create a new table storing all translations
        if (!Schema::hasTable($title)) {
            Schema::connection('mysql')->create($title, function (Blueprint $table) {
                $table->id();
                $table->json('term');
                $table->json('definition');
                $table->boolean('isHard')->default(false);
                $table->boolean("isFavourite")->default(false);
                $table->timestamps();
            });

            foreach($request->translations as $key => $translation) {

                $term = Translations::makeSingle($translation['term'], Translations::getLanguageShortcut
                ($languages['source']));
                $definition = Translations::makeSingle($translation['definition'], Translations::getLanguageShortcut
                ($languages['target']));

                DB::table($title)->insert([
                    'term' => $term,
                    'definition' => $definition,
                ]);

                $setProgress = new FlashcardsSetsProgress;
                $setProgress->flashcard_sets_id = FlashcardSets::orderBy('id', 'desc')->first()->id;
                $setProgress->translation_id = $key + 1;
                $setProgress->status = 'unknown';
                $setProgress->isFavourite = false;

                $user->setsProgress()->save($setProgress);
            }
        }

        return to_route('flashcards.showSet', [DB::table('flashcard_sets')->where('title', $title)->value('id'), $title])->with('success', "Your set has been created successfully");
    }

    public static function getUserSets(int $id): array {
        return FlashcardSets::getUserSets($id);
    }

    public static function getFoundSets(int $currentPage, string $searching, $filters): array {

        return FlashcardSets::getFoundSets($currentPage, $searching, $filters);
    }

    public function update(int $id, string $title, UpdateSetRequest $request)
    {
        foreach ($request->translations as $translation) {
            $term = Translations::makeSingle($translation['term']['word'], $translation['term']['language']);
            $definition = Translations::makeSingle($translation['definition']['word'], $translation['definition']['language']);

            if (in_array('isNew', $translation)) {
                DB::table($title)->insert(['term' => $term, 'definition' => $definition]);
            } else {
                DB::table($title)->where('id', $translation['id'])->update(['term' => $term, 'definition' => $definition]);
            }
        }

        $newTitle = str_replace(' ', '_', $request->title);
        if ($title !== $newTitle) {
            FlashcardSets::where('title', $title)->update([
                'title' => $newTitle
            ]);
            DB::connection('mysql')->statement("RENAME TABLE $title TO $newTitle");
        }

        FlashcardSets::where('id', $id)->update(['title' => $newTitle, 'description' => $request->description]);

        return redirect()->route('flashcards.showSet', ['id' => $id, 'title' => $newTitle])->with('success', 'Your set has been updated successfully');
    }

    public function deleteSet(int $id, string $title): RedirectResponse
    {
        FlashcardSets::where('id', $id)->delete();

        Schema::dropIfExists($title);

        return redirect()->route('home')->with('success', 'Set has been removed successfully');
    }
}