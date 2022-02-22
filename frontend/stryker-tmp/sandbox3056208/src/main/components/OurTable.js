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
import { useTable, useSortBy } from 'react-table';
import { Table, Button } from "react-bootstrap";
export default function OurTable({
  columns,
  data,
  testid = stryMutAct_9fa48("112") ? "" : (stryCov_9fa48("112"), "testid")
}) {
  if (stryMutAct_9fa48("113")) {
    {}
  } else {
    stryCov_9fa48("113");
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow
    } = useTable(stryMutAct_9fa48("114") ? {} : (stryCov_9fa48("114"), {
      columns,
      data
    }), useSortBy);
    return <Table {...getTableProps()} striped bordered hover>
      <thead>
        {headerGroups.map(stryMutAct_9fa48("115") ? () => undefined : (stryCov_9fa48("115"), headerGroup => <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(stryMutAct_9fa48("116") ? () => undefined : (stryCov_9fa48("116"), column => <th {...column.getHeaderProps(column.getSortByToggleProps())} data-testid={stryMutAct_9fa48("117") ? `` : (stryCov_9fa48("117"), `${testid}-header-${column.id}`)}>
                {column.render(stryMutAct_9fa48("118") ? "" : (stryCov_9fa48("118"), 'Header'))}
                <span data-testid={stryMutAct_9fa48("119") ? `` : (stryCov_9fa48("119"), `${testid}-header-${column.id}-sort-carets`)}>
                  {column.isSorted ? column.isSortedDesc ? stryMutAct_9fa48("120") ? "" : (stryCov_9fa48("120"), ' 🔽') : stryMutAct_9fa48("121") ? "" : (stryCov_9fa48("121"), ' 🔼') : stryMutAct_9fa48("122") ? "Stryker was here!" : (stryCov_9fa48("122"), '')}
                </span>
              </th>))}
          </tr>))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          if (stryMutAct_9fa48("123")) {
            {}
          } else {
            stryCov_9fa48("123");
            prepareRow(row);
            return <tr {...row.getRowProps()}>
              {row.cells.map((cell, _index) => {
                if (stryMutAct_9fa48("124")) {
                  {}
                } else {
                  stryCov_9fa48("124");
                  return <td {...cell.getCellProps()} data-testid={stryMutAct_9fa48("125") ? `` : (stryCov_9fa48("125"), `${testid}-cell-row-${cell.row.index}-col-${cell.column.id}`)}>
                    {cell.render(stryMutAct_9fa48("126") ? "" : (stryCov_9fa48("126"), 'Cell'))}
                  </td>;
                }
              })}
            </tr>;
          }
        })}
      </tbody>
    </Table>;
  }
} // The callback function for ButtonColumn should have the form
// (cell) => { doSomethingWith(cell); }
// The fields in cell are:
//   ["column","row","value","getCellProps","render"]
// Documented here: https://react-table.tanstack.com/docs/api/useTable#cell-properties
// Typically, you want cell.row.values, which is where you can get the individual
//   fields of the object representing the row in the table.
// Example: 
//   const deleteCallback = (cell) => 
//      toast(`Delete Callback called on id: ${cell.row.values.id} name: ${cell.row.values.name}`);
// Add it to table like this:
// const columns = [
//   {
//       Header: 'id',
//       accessor: 'id', // accessor is the "key" in the data
//   },
//   {
//       Header: 'Name',
//       accessor: 'name',
//   },
//   ButtonColumn("Edit", "primary", editCallback),
//   ButtonColumn("Delete", "danger", deleteCallback)
// ];

export function ButtonColumn(label, variant, callback, testid) {
  if (stryMutAct_9fa48("127")) {
    {}
  } else {
    stryCov_9fa48("127");
    const column = stryMutAct_9fa48("128") ? {} : (stryCov_9fa48("128"), {
      Header: label,
      id: label,
      Cell: stryMutAct_9fa48("129") ? () => undefined : (stryCov_9fa48("129"), ({
        cell
      }) => <Button variant={variant} onClick={stryMutAct_9fa48("130") ? () => undefined : (stryCov_9fa48("130"), () => callback(cell))} data-testid={stryMutAct_9fa48("131") ? `` : (stryCov_9fa48("131"), `${testid}-cell-row-${cell.row.index}-col-${cell.column.id}-button`)}>
        {label}
      </Button>)
    });
    return column;
  }
}