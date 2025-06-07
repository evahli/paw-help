import { useQuery } from "@tanstack/react-query";

const ExampleComponent = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["todos"],
    queryFn: () => fetch("/api/todos").then((res) => res.json()),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data.map((todo) => (
        <div key={todo.id}>{todo.title}</div>
      ))}
    </div>
  );
};

export default ExampleComponent;
