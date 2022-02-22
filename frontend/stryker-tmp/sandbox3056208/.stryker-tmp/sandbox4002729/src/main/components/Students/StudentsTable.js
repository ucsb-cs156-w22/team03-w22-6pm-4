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
import OurTable from "main/components/OurTable";
export default function StudentsTable({
  students,
  currentUser
}) {
  if (stryMutAct_9fa48("138")) {
    {}
  } else {
    stryCov_9fa48("138");
    const columns = stryMutAct_9fa48("139") ? [] : (stryCov_9fa48("139"), [stryMutAct_9fa48("140") ? {} : (stryCov_9fa48("140"), {
      Header: stryMutAct_9fa48("141") ? "" : (stryCov_9fa48("141"), 'id'),
      accessor: stryMutAct_9fa48("142") ? "" : (stryCov_9fa48("142"), 'id') // accessor is the "key" in the data

    }), stryMutAct_9fa48("143") ? {} : (stryCov_9fa48("143"), {
      Header: stryMutAct_9fa48("144") ? "" : (stryCov_9fa48("144"), 'First Name'),
      accessor: stryMutAct_9fa48("145") ? "" : (stryCov_9fa48("145"), 'firstName')
    }), stryMutAct_9fa48("146") ? {} : (stryCov_9fa48("146"), {
      Header: stryMutAct_9fa48("147") ? "" : (stryCov_9fa48("147"), 'Last Name'),
      accessor: stryMutAct_9fa48("148") ? "" : (stryCov_9fa48("148"), 'lastName')
    }), stryMutAct_9fa48("149") ? {} : (stryCov_9fa48("149"), {
      Header: stryMutAct_9fa48("150") ? "" : (stryCov_9fa48("150"), 'Perm'),
      accessor: stryMutAct_9fa48("151") ? "" : (stryCov_9fa48("151"), 'perm')
    })]); // Stryker disable ArrayDeclaration : [columns] and [students] are performance optimization; mutation preserves correctness

    const memoizedColumns = React.useMemo(stryMutAct_9fa48("152") ? () => undefined : (stryCov_9fa48("152"), () => columns), [columns]);
    const memoizedDates = React.useMemo(stryMutAct_9fa48("154") ? () => undefined : (stryCov_9fa48("154"), () => students), [students]); // Stryker enable ArrayDeclaration

    return <OurTable data={memoizedDates} columns={memoizedColumns} testid={stryMutAct_9fa48("156") ? "" : (stryCov_9fa48("156"), "StudentsTable")} />;
  }
}
;