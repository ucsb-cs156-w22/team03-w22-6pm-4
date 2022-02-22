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

import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function CollegiateSubredditForm({
  initialCollegiateSubreddit,
  submitAction,
  buttonLabel = stryMutAct_9fa48("0") ? "" : (stryCov_9fa48("0"), "Create")
}) {
  if (stryMutAct_9fa48("1")) {
    {}
  } else {
    stryCov_9fa48("1");
    // Stryker disable all
    const {
      register,
      formState: {
        errors
      },
      handleSubmit
    } = useForm({
      defaultValues: initialCollegiateSubreddit || {}
    }); // Stryker enable all

    const navigate = useNavigate(); // For explanation, see: https://stackoverflow.com/questions/3143070/javascript-regex-iso-datetime
    // Note that even this complex regex may still need some tweaks
    // Stryker disable next-line Regex
    //const isodate_regex = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)/i;
    // Stryker disable next-line all
    //const yyyyq_regex = /((19)|(20))\d{2}[1-4]/i; // Accepts from 1900-2099 followed by 1-4.  Close enough.

    return <Form onSubmit={handleSubmit(submitAction)}>

            {initialCollegiateSubreddit && <Form.Group className="mb-3">
                    <Form.Label htmlFor="id">Id</Form.Label>
                    <Form.Control data-testid="CollegiateSubredditForm-id" id="id" type="text" {...register("id")} value={initialCollegiateSubreddit.id} disabled />
                </Form.Group>}

            <Form.Group className="mb-3">
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control data-testid="CollegiateSubredditForm-name" id="name" type="text" isInvalid={Boolean(errors.name)} {...register("name", {
          required: "Name is required."
        })} />
                <Form.Control.Feedback type="invalid">
                    {errors.name?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label htmlFor="location">Location</Form.Label>
                <Form.Control data-testid="CollegiateSubredditForm-location" id="location" type="text" isInvalid={Boolean(errors.location)} {...register("location", {
          required: "Location is required."
        })} />
                <Form.Control.Feedback type="invalid">
                    {errors.location?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label htmlFor="subreddit">Subreddit</Form.Label>
                <Form.Control data-testid="CollegiateSubredditForm-subreddit" id="subreddit" type="text" isInvalid={Boolean(errors.subreddit)} {...register("subreddit", {
          required: "Subreddit is required."
        })} />
                <Form.Control.Feedback type="invalid">
                    {errors.subreddit?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" data-testid="CollegiateSubredditForm-submit">
                {buttonLabel}
            </Button>
            <Button variant="Secondary" onClick={() => navigate(-1)} data-testid="CollegiateSubredditForm-cancel">
                Cancel
            </Button>

        </Form>;
  }
}

export default CollegiateSubredditForm;