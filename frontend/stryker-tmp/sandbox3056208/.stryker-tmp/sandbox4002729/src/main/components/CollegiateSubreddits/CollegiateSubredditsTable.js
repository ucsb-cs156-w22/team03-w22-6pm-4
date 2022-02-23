// @ts-nocheck
function stryNS_9fa48() {
  var g = new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});

  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }

  function retrieveNS() {
    return ns;
  }

  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}

stryNS_9fa48();

function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });

  function cover() {
    var c = cov.static;

    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }

    var a = arguments;

    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }

  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}

function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();

  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }

      return true;
    }

    return false;
  }

  stryMutAct_9fa48 = isActive;
  return isActive(id);
}

import React from "react";
import OurTable, { ButtonColumn } from "main/components/OurTable"; // import { toast } from "react-toastify";

import { useBackendMutation } from "main/utils/useBackend";
import { cellToAxiosParamsDelete, onDeleteSuccess } from "main/utils/collegiateSubredditUtils";
import { useNavigate } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";
export default function CollegiateSubredditsTable({
  subreddits,
  currentUser
}) {
  if (stryMutAct_9fa48("24")) {
    {}
  } else {
    stryCov_9fa48("24");
    const navigate = useNavigate();

    const editCallback = cell => {
      if (stryMutAct_9fa48("25")) {
        {}
      } else {
        stryCov_9fa48("25");
        navigate(stryMutAct_9fa48("26") ? `` : (stryCov_9fa48("26"), `/collegiateSubreddits/edit/${cell.row.values.id}`));
      }
    }; // Stryker disable all : hard to test for query caching


    const deleteMutation = useBackendMutation(cellToAxiosParamsDelete, {
      onSuccess: onDeleteSuccess
    }, ["/api/collegiateSubreddits/all"]); // Stryker enable all 
    // Stryker disable next-line all : TODO try to make a good test for this

    const deleteCallback = async cell => {
      deleteMutation.mutate(cell);
    };

    const columns = [{
      Header: 'id',
      accessor: 'id' // accessor is the "key" in the data

    }, {
      Header: 'Name',
      accessor: 'name'
    }, {
      Header: 'Location',
      accessor: 'location'
    }, {
      Header: 'Subreddit',
      accessor: 'subreddit'
    }];

    if (hasRole(currentUser, "ROLE_ADMIN")) {
      columns.push(ButtonColumn("Edit", "primary", editCallback, "CollegiateSubredditsTable"));
      columns.push(ButtonColumn("Delete", "danger", deleteCallback, "CollegiateSubredditsTable"));
    } // Stryker disable next-line ArrayDeclaration : [columns] is a performance optimization


    const memoizedColumns = React.useMemo(() => columns, [columns]);
    const memoizedSubreddits = React.useMemo(() => subreddits, [subreddits]);
    return <OurTable data={memoizedSubreddits} columns={memoizedColumns} testid={"CollegiateSubredditsTable"} />;
  }
}
;