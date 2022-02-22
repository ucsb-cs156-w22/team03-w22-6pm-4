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

import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export function useCurrentUser() {
  if (stryMutAct_9fa48("474")) {
    {}
  } else {
    stryCov_9fa48("474");
    let rolesList = stryMutAct_9fa48("475") ? [] : (stryCov_9fa48("475"), [stryMutAct_9fa48("476") ? "" : (stryCov_9fa48("476"), "ERROR_GETTING_ROLES")]);
    return useQuery(stryMutAct_9fa48("477") ? "" : (stryCov_9fa48("477"), "current user"), async () => {
      if (stryMutAct_9fa48("478")) {
        {}
      } else {
        stryCov_9fa48("478");

        try {
          if (stryMutAct_9fa48("479")) {
            {}
          } else {
            stryCov_9fa48("479");
            const response = await axios.get(stryMutAct_9fa48("480") ? "" : (stryCov_9fa48("480"), "/api/currentUser"));

            try {
              if (stryMutAct_9fa48("481")) {
                {}
              } else {
                stryCov_9fa48("481");
                rolesList = response.data.roles.map(stryMutAct_9fa48("482") ? () => undefined : (stryCov_9fa48("482"), r => r.authority));
              }
            } catch (e) {
              if (stryMutAct_9fa48("483")) {
                {}
              } else {
                stryCov_9fa48("483");
                console.error(stryMutAct_9fa48("484") ? "" : (stryCov_9fa48("484"), "Error getting roles: "), e);
              }
            }

            response.data = stryMutAct_9fa48("485") ? {} : (stryCov_9fa48("485"), { ...response.data,
              rolesList: rolesList
            });
            return stryMutAct_9fa48("486") ? {} : (stryCov_9fa48("486"), {
              loggedIn: stryMutAct_9fa48("487") ? false : (stryCov_9fa48("487"), true),
              root: response.data
            });
          }
        } catch (e) {
          if (stryMutAct_9fa48("488")) {
            {}
          } else {
            stryCov_9fa48("488");
            console.error(stryMutAct_9fa48("489") ? "" : (stryCov_9fa48("489"), "Error invoking axios.get: "), e);
            return stryMutAct_9fa48("490") ? {} : (stryCov_9fa48("490"), {
              loggedIn: stryMutAct_9fa48("491") ? true : (stryCov_9fa48("491"), false),
              root: null
            });
          }
        }
      }
    }, stryMutAct_9fa48("492") ? {} : (stryCov_9fa48("492"), {
      initialData: stryMutAct_9fa48("493") ? {} : (stryCov_9fa48("493"), {
        loggedIn: stryMutAct_9fa48("494") ? true : (stryCov_9fa48("494"), false),
        root: null,
        initialData: stryMutAct_9fa48("495") ? false : (stryCov_9fa48("495"), true)
      })
    }));
  }
}
export function useLogout() {
  if (stryMutAct_9fa48("496")) {
    {}
  } else {
    stryCov_9fa48("496");
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const mutation = useMutation(async () => {
      if (stryMutAct_9fa48("497")) {
        {}
      } else {
        stryCov_9fa48("497");
        await axios.post(stryMutAct_9fa48("498") ? "" : (stryCov_9fa48("498"), "/logout"));
        await queryClient.resetQueries(stryMutAct_9fa48("499") ? "" : (stryCov_9fa48("499"), "current user"), stryMutAct_9fa48("500") ? {} : (stryCov_9fa48("500"), {
          exact: stryMutAct_9fa48("501") ? false : (stryCov_9fa48("501"), true)
        }));
        navigate(stryMutAct_9fa48("502") ? "" : (stryCov_9fa48("502"), "/"));
      }
    });
    return mutation;
  }
}
export function hasRole(currentUser, role) {
  if (stryMutAct_9fa48("503")) {
    {}
  } else {
    stryCov_9fa48("503");
    // The following hack is because there is some bug in terms of the
    // shape of the data returned by useCurrentUser.  Is there a separate 
    // data level, or not? 
    // We will file an issue to track that down and then remove this hack
    if (stryMutAct_9fa48("506") ? currentUser != null : stryMutAct_9fa48("505") ? false : stryMutAct_9fa48("504") ? true : (stryCov_9fa48("504", "505", "506"), currentUser == null)) return stryMutAct_9fa48("507") ? true : (stryCov_9fa48("507"), false);

    if (stryMutAct_9fa48("510") ? "data" in currentUser && "root" in currentUser.data && currentUser.data.root != null || "rolesList" in currentUser.data.root : stryMutAct_9fa48("509") ? false : stryMutAct_9fa48("508") ? true : (stryCov_9fa48("508", "509", "510"), (stryMutAct_9fa48("512") ? "data" in currentUser && "root" in currentUser.data || currentUser.data.root != null : stryMutAct_9fa48("511") ? true : (stryCov_9fa48("511", "512"), (stryMutAct_9fa48("514") ? "data" in currentUser || "root" in currentUser.data : stryMutAct_9fa48("513") ? true : (stryCov_9fa48("513", "514"), (stryMutAct_9fa48("515") ? "" : (stryCov_9fa48("515"), "data")) in currentUser && (stryMutAct_9fa48("516") ? "" : (stryCov_9fa48("516"), "root")) in currentUser.data)) && (stryMutAct_9fa48("518") ? currentUser.data.root == null : stryMutAct_9fa48("517") ? true : (stryCov_9fa48("517", "518"), currentUser.data.root != null)))) && (stryMutAct_9fa48("519") ? "" : (stryCov_9fa48("519"), "rolesList")) in currentUser.data.root)) {
      if (stryMutAct_9fa48("520")) {
        {}
      } else {
        stryCov_9fa48("520");
        return currentUser.data.root.rolesList.includes(role);
      }
    }

    return stryMutAct_9fa48("522") ? currentUser.root.rolesList?.includes(role) : stryMutAct_9fa48("521") ? currentUser.root?.rolesList.includes(role) : (stryCov_9fa48("521", "522"), currentUser.root?.rolesList?.includes(role));
  }
}