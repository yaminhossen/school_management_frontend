import React from 'react';
import Layout from './Layout';
import Index from '../Index';
import SingleStudent from '../pages/SingleStudent';
import AcademicInformation from '../pages/AcademicInformation';
import BasicInformation from '../pages/BasicInformation';
import Document from '../pages/Document';
import Skills from '../pages/Skills';
import Language from '../pages/Language';
import ContactNumber from '../pages/ContactNumer';
import EducationalBackground from '../pages/EducationalBackground';
import Dues from '../pages/Dues';
import Results from '../pages/Results';
import Markshit from '../pages/Markshit';
import Parents from '../pages/Parent';
import Payments from '../pages/Payments';
import Review from '../pages/Review';
import path from 'path';
import Complain from '../pages/Complain';
import Markshit2 from '../pages/Markshit2';
import Markshit1 from '../pages/Markshit1';
import TermResult from '../pages/TermResult';

// export { default as DashboardCounterAll} from "./All.jsx";

export default {
    path: 'childrens',
    element: <Layout />,
    children: [
        {
            path: '',
            index: true,
            element: <Index />,
        },
        {
            path: 'details/:id',
            element: <SingleStudent />,
            children: [
                {
                    path: 'basic-information',
                    element: <BasicInformation />,
                },
                {
                    path: 'academic-information',
                    element: <AcademicInformation />,
                },
                {
                    path: 'document',
                    element: <Document />,
                },
                {
                    path: 'skill',
                    element: <Skills />,
                },
                {
                    path: 'parent',
                    element: <Parents />,
                },
                {
                    path: 'language',
                    element: <Language />,
                },
                {
                    path: 'contact-number',
                    element: <ContactNumber />,
                },
                {
                    path: 'educational-background',
                    element: <EducationalBackground />,
                },
                {
                    path: 'dues',
                    element: <Dues />,
                },
                {
                    path: 'payments',
                    element: <Payments />,
                },
                {
                    path: 'result-part',
                    element: <Results />,
                },
                // {
                //     path: 'mark-sheet',
                //     element: <Markshit />,
                // },
                {
                    path: 'mark-sheet',
                    element: <Markshit1 />,
                    // children: [
                    //     {
                    //         path: 'detailss/:id',
                    //         element: <Markshit2 />,
                    //     },
                    //     {
                    //         path: 'term-exam/:termid/:classid',
                    //         element: <TermResult />,
                    //     },
                    // ],
                },
                {
                    path: 'mark-sheet/detailss/:classid',
                    element: <Markshit2 />,
                },
                {
                    path: 'mark-sheet/detailss/:classid/term-exam/:termid',
                    element: <TermResult />,
                },
                // {
                //     path: 'mark-sheet/details/:id',
                //     element: <Markshit2 />,
                // },
                {
                    path: 'complain',
                    element: <Complain />,
                },
                {
                    path: 'review',
                    element: <Review />,
                },
            ],
        },
    ],
};
