import { Button } from 'react-bootstrap';

import { toast } from "react-toastify";

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";

import EarthquakesTable from "main/components/Earthquakes/EarthquakesTable";

import { hasRole, useCurrentUser } from "main/utils/currentUser";
import { useBackend, useBackendMutation } from 'main/utils/useBackend';

function PurgeButton()
{
  let purge = useBackendMutation(
    () => ({ url: "/api/earthquakes/purge", method: "POST" }),
    { onSuccess: () => { toast("🔥 Earthquakes purged. 🔥"); } },
    // Stryker disable next-line all : don't test internal caching of React Query
    ["get_earthquakes"],
  );

  const { data: currentUser } = useCurrentUser();

  if (hasRole(currentUser, "ROLE_ADMIN")) {
    return (
      <Button variant="outline-danger" onClick={ () => { purge.mutate(); } } data-testid="purge-button">
        Purge earthquakes. 💥
      </Button>
    );
  }

  // Do not render the button if the user is not an administrator.
  return null;
}

export default function EarthquakesIndexPage()
{
  const currentUser = useCurrentUser();

  const { data: earthquakes, error: _error, status: _status } =
    useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      ["get_earthquakes"],
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
