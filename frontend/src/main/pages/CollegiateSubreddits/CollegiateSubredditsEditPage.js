import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { useParams } from "react-router-dom";
import CollegiateSubredditForm from "main/components/CollegiateSubreddits/CollegiateSubredditForm";
import { Navigate } from 'react-router-dom'
import { useBackend, useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";

export default function CollegiateSubredditsEditPage() {
  let { id } = useParams();

  const { data: collegiateSubreddit, error: error, status: status } =
    useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      [`/api/collegiatesubreddits?id=${id}`],
      {  // Stryker disable next-line all : GET is the default, so changing this to "" doesn't introduce a bug
        method: "GET",
        url: `/api/collegiatesubreddits`,
        params: {
          id
        }
      }
    );


  const objectToAxiosPutParams = (collegiateSubreddit) => ({
    url: "/api/collegiatesubreddits",
    method: "PUT",
    params: {
      id: collegiateSubreddit.id,
    },
    data: {
      name: collegiateSubreddit.name,
      location: collegiateSubreddit.location,
      subreddit: collegiateSubreddit.subreddit
    }
  });

  const onSuccess = (collegiateSubreddit) => {
    toast(`CollegiateSubreddit Updated - id: ${collegiateSubreddit.id} name: ${collegiateSubreddit.name}`);
  }

  const mutation = useBackendMutation(
    objectToAxiosPutParams,
    { onSuccess },
    // Stryker disable next-line all : hard to set up test for caching
    [`/api/collegiatesubreddits?id=${id}`]
  );

  const { isSuccess } = mutation

  const onSubmit = async (data) => {
    mutation.mutate(data);
  }

  if (isSuccess) {
    return <Navigate to="/collegiatesubreddits/list" />
  }

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Edit CollegiateSubreddit</h1>
        {collegiateSubreddit &&
          <CollegiateSubredditForm initialCollegiateSubreddit={collegiateSubreddit} submitAction={onSubmit} buttonLabel="Update" />
        }
      </div>
    </BasicLayout>
  )
}

/*
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";

export default function CollegiateSubredditsEditPage() {
  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Todos</h1>
        <p>
          This is where the edit page will go
        </p>
      </div>
    </BasicLayout>
  )
}
*/
