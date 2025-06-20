import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index.js';
import dashboard_routes from './routes';
import axios from 'axios';
import { anyObject } from '../../../src/modules/common_types/object';

function Component() {
    const router = createHashRouter(dashboard_routes);
    return <RouterProvider router={router}></RouterProvider>;
}

const container: HTMLElement | null = document.getElementById('app');
if (container) {
    const root = createRoot(container);
    root.render(
        <Provider store={store}>
            <Component />
        </Provider>,
    );
}
// Reusable function to clear previous error elements and classes
function clearErrors() {
    // Remove all '.form_error' elements
    let form_errors = document.querySelectorAll('.form_error');
    // console.log('form errrors', form_errors);
    [...form_errors].forEach((e) => e.remove());

    // Remove 'has_error' class from elements
    let has_errors = document.querySelectorAll('.has_error');
    [...has_errors].forEach((e) => e.classList.remove('has_error'));
}

axios.interceptors.request.use(
    function (config) {
        clearErrors();

        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

axios.interceptors.response.use(
    function (response) {
        if (response.status == 217) {
            location.href = '/super-admin/login';
        }
        return response;
    },

    function (error) {
        if (error.response.data.status === 422) {
            let errors = error.response.data.data;

            errors.forEach((error) => {
                let el = document.querySelector(`[name="${error.path}"]`);

                if (el) {
                    (el.parentNode as HTMLElement)?.classList.add('has_error');
                    (el.parentNode as HTMLElement)?.insertAdjacentHTML(
                        'beforeend',
                        `
                        <div class="form_error">
                            ${error.msg}
                        </div>
                        `,
                    );
                }
            });

            (window as anyObject).toaster(
                // `${error.response.status} - ${error.response.statusText}`,
                `${error.response.status} - validation error`,
                'error',
            );

            console.log(error.response);
        }
        // if (error.response.data.status == 500) {
        //     (window as anyObject).toaster(
        //         `${error.response.data.message}`,
        //         'error',
        //     );
        // }
        return Promise.reject(error);
    },
);
