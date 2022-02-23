// @ts-nocheck
import React from 'react';

import CollegiateSubredditsTable from "main/components/CollegiateSubreddits/CollegiateSubredditsTable";
import { collegiateSubredditsFixtures } from 'fixtures/collegiateSubredditsFixtures';

export default {
    title: 'components/collegiateSubreddits/CollegiateSubredditsTable',
    component: CollegiateSubredditsTable
};

const Template = (args) => {
    return (
        <CollegiateSubredditsTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    subreddits: []
};

export const ThreeCollegiateSubreddits = Template.bind({});

ThreeCollegiateSubreddits.args = {
    subreddits: collegiateSubredditsFixtures.threeCollegiateSubreddits
};


