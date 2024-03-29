<?php

namespace Tests\Feature\Flashcards;

use App\Models\FlashcardSets;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class HomeTest extends TestCase
{
    public function test_home_as_user_rendered(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get('/');

        $response->assertOk();
    }
    public function test_home_as_guest_rendered(): void
    {
        $response = $this
            ->get('/');

        $response->assertOk();
    }

    public function test_user_can_get_all_his_sets() {
        $user = User::factory()->create();
        $sets = FlashcardSets::factory()->create(['user_id' => $user->id]);

        $response = $this
            ->actingAs($user)
            ->getJson(route('getUserSets', [
                'id' => $user->id
            ]));

        $response->assertOk();
    }
    public function test_user_can_render_each_set() {
        $user = User::factory()->create();
        $sets =
            FlashcardSets::factory(1)->create(['user_id' => $user->id]);

        $responses = [];
        foreach ($sets as $set) {
            $responses[] = $this->actingAs($user)->get(route('flashcards.showSet', [
                'id' => $set->id,
                'title' => $set->title
            ]));
        }

        $this->assertTrue(count(array_filter($responses, fn ($response) => $response->assertOk())) === count($responses));
    }

    public function test_user_can_search_tests() {
        $user = User::factory()->create();
        $sets =
            FlashcardSets::factory(1)->create(['user_id' => $user->id]);

        $response = $this
            ->actingAs($user)
            ->getJson(route('searchInSets', [
                'currentPage' => 0,
                // pass only first member of the set title
                'searching' => explode('_', fake()->randomElement($sets)->title)[0]
            ]));

        $response->assertOk();
    }

}