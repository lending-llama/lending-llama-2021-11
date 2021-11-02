import React from "react";
import {XCircleIcon} from '@heroicons/react/solid'
import {useDispatch, useSelector} from "react-redux";
import * as r from 'ramda'
import {errorsDismissedFirst} from "./actions/errors";

// https://tailwindui.com/components/application-ui/feedback/alerts

const ErrorAlertPresentation = ({msg, onDismiss}) => (
  <div className="rounded-md bg-red-50 p-4">
    <div className="flex">
      <div className="flex-shrink-0">
        <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true"/>
      </div>
      <div className="ml-3 w-full">
        <h3 className="text-sm font-medium text-red-800">Something went wrong</h3>
        <div className="mt-2 text-sm text-red-700 overflow-auto max-h-96">
          <p>{msg}</p>
        </div>
        <div className="mt-4">
          <div className="-mx-2 -my-1.5 flex">
            <button
              type="button"
              className="bg-red-50 px-2 py-1.5 rounded-md text-sm font-medium text-red-800 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-red-600"
              onClick={onDismiss}
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const ErrorAlert = () => {
  const errors = useSelector(x => x.errors)
  const dispatch = useDispatch()

  if (r.isEmpty(errors)) { return null }
  return <ErrorAlertPresentation
    msg={r.head(errors)}
    onDismiss={() => dispatch(errorsDismissedFirst())}
  />;
};
