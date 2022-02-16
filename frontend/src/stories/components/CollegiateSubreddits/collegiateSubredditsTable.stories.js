import React from 'react';

import collegiateSubredditsTable from "main/components/collegiateSubreddits/collegiateSubredditsTable";
import { collegiateSubredditsFixtures } from 'fixtures/collegiateSubredditsFixtures';

export default {
    title: 'components/collegiateSubreddits/collegiateSubredditsTable',
    component: collegiateSubredditsTable
};

const Template = (args) => {
    return (
        <collegiateSubredditsTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    dates: []
};

export const ThreeDates = Template.bind({});

ThreeDates.args = {
    dates: collegiateSubredditsFixtures.threeDates
};


