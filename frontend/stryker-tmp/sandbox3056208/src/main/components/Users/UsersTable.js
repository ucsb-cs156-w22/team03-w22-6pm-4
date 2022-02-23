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
const columns = stryMutAct_9fa48("357") ? [] : (stryCov_9fa48("357"), [stryMutAct_9fa48("358") ? {} : (stryCov_9fa48("358"), {
  Header: stryMutAct_9fa48("359") ? "" : (stryCov_9fa48("359"), 'id'),
  accessor: stryMutAct_9fa48("360") ? "" : (stryCov_9fa48("360"), 'id') // accessor is the "key" in the data

}), stryMutAct_9fa48("361") ? {} : (stryCov_9fa48("361"), {
  Header: stryMutAct_9fa48("362") ? "" : (stryCov_9fa48("362"), 'First Name'),
  accessor: stryMutAct_9fa48("363") ? "" : (stryCov_9fa48("363"), 'givenName')
}), stryMutAct_9fa48("364") ? {} : (stryCov_9fa48("364"), {
  Header: stryMutAct_9fa48("365") ? "" : (stryCov_9fa48("365"), 'Last Name'),
  accessor: stryMutAct_9fa48("366") ? "" : (stryCov_9fa48("366"), 'familyName')
}), stryMutAct_9fa48("367") ? {} : (stryCov_9fa48("367"), {
  Header: stryMutAct_9fa48("368") ? "" : (stryCov_9fa48("368"), 'Email'),
  accessor: stryMutAct_9fa48("369") ? "" : (stryCov_9fa48("369"), 'email')
}), stryMutAct_9fa48("370") ? {} : (stryCov_9fa48("370"), {
  Header: stryMutAct_9fa48("371") ? "" : (stryCov_9fa48("371"), 'Admin'),
  id: stryMutAct_9fa48("372") ? "" : (stryCov_9fa48("372"), 'admin'),
  accessor: stryMutAct_9fa48("373") ? () => undefined : (stryCov_9fa48("373"), (row, _rowIndex) => String(row.admin)) // hack needed for boolean values to show up

})]);
export default function UsersTable({
  users
}) {
  if (stryMutAct_9fa48("374")) {
    {}
  } else {
    stryCov_9fa48("374");
    return <OurTable data={users} columns={columns} testid={stryMutAct_9fa48("375") ? "" : (stryCov_9fa48("375"), "UsersTable")} />;
  }
}
;