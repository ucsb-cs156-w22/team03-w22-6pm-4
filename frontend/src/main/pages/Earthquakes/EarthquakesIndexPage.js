import { Button } from 'react-bootstrap';

import { toast } from "react-toastify";

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";

import EarthquakesTable from "main/components/Earthquakes/EarthquakesTable";

import { useBackend, useBackendMutation } from 'main/utils/useBackend';
import { useCurrentUser } from 'main/utils/currentUser';

// I don't know what I'm doing.
// https://stackoverflow.com/questions/66056529/react-error-invalid-hook-call-hooks-can-only-be-called-inside-of-the-body-of/66056689

function PurgeButton()
{
  let purge = useBackendMutation(
    () => ({ url: "/api/earthquakes/purge", method: "POST" }),
    { onSuccess: () => { toast("🔥 Earthquakes purged. 🔥"); } },
    ["/api/earthquakes/purge"]
  );

  return (
    <Button variant="outline-danger" onClick={ () => { purge.mutate(); } } data-testid="purge-button">
      Purge earthquakes. 💥
    </Button>
  );
}

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
        <EarthquakesTable earthquakes={properties} currentUser={currentUser}/>
        <PurgeButton/>
      </div>
    </BasicLayout>
  )
}
