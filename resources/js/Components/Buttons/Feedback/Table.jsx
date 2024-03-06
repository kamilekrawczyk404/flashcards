export const Table = ({ groups, data = [], className = "", ...props }) => {
  const columns = ["Id", "Group Name", "Term", "Definition"];

  return (
    <div className="rounded-md max-h-[50vh] overflow-y-auto">
      <table
        className={"w-full text-left text-gray-500 " + className}
        {...props}
      >
        <thead className="uppercase relative">
          <tr>
            {columns.map((columnName, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-3 first-of-type:rounded-tl-md last-of-type:rounded-tr-md text-transparent bg-indigo-500 text-white"
              >
                {columnName.toLowerCase() === "id" ? "index" : columnName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {groups.map((group, groupIndex) =>
            group.components.map((component, componentIndex) => {
              if (
                data.some((element) => element === component.translation.id)
              ) {
                return (
                  <tr
                    className="bg-white border-b transition"
                    key={`${groupIndex}.${componentIndex}`}
                  >
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap last-of-type:rounded-bl-md last-of-type:rounded-br-md"
                    >
                      {component.translation.id}
                    </td>{" "}
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap last-of-type:rounded-bl-md last-of-type:rounded-br-md"
                    >
                      {component.translation.group_name}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap last-of-type:rounded-bl-md last-of-type:rounded-br-md"
                    >
                      {component.translation.term}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap last-of-type:rounded-bl-md last-of-type:rounded-br-md"
                    >
                      {component.translation.definition}
                    </td>
                  </tr>
                );
              }
            }),
          )}
        </tbody>
      </table>
    </div>
  );
};