import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import EarthquakesTable from "main/components/Earthquakes/EarthquakesTable";

import { useBackend } from 'main/utils/useBackend';
import { useCurrentUser } from 'main/utils/currentUser';

export default function EarthquakesIndexPage()
{
  const currentUser = useCurrentUser();

  const { data: earthquakes, error: _error, status: _status } =
    useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      ["/api/earthquakes/all"],
      { method: "GET", url: "/api/earthquakes/all" },
      []
    );

  const properties = earthquakes.map(quake => {
    const flattened = quake.properties;
    flattened.id = quake.id;
    return flattened;
  });

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Earthquakes 🌎</h1>
        <EarthquakesTable earthquakes={properties} currentUser={currentUser} />
      </div>
    </BasicLayout>
  )
}
