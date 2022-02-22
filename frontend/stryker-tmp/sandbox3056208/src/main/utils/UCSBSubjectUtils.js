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

import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
export function onDeleteSuccess(message) {
  if (stryMutAct_9fa48("460")) {
    {}
  } else {
    stryCov_9fa48("460");
    console.log(message);
    toast(message);
  }
}
export function cellToAxiosParamsDelete(cell) {
  if (stryMutAct_9fa48("461")) {
    {}
  } else {
    stryCov_9fa48("461");
    return stryMutAct_9fa48("462") ? {} : (stryCov_9fa48("462"), {
      url: stryMutAct_9fa48("463") ? "" : (stryCov_9fa48("463"), "/api/UCSBSubjects"),
      method: stryMutAct_9fa48("464") ? "" : (stryCov_9fa48("464"), "DELETE"),
      params: stryMutAct_9fa48("465") ? {} : (stryCov_9fa48("465"), {
        id: cell.row.values.id
      })
    });
  }
}