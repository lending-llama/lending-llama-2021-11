import React from "react";
import {useDispatch, useSelector} from "react-redux";
import * as r from 'ramda'
import {errorsDismissedFirst} from "../../actions/errors";
import {ErrorAlertPresentation} from "../presentation/ErrorAlertPresentation";

export const ErrorAlert = () => {
  const errors = useSelector(x => x.errors)
  const dispatch = useDispatch()

  if (r.isEmpty(errors)) { return null }
  return <ErrorAlertPresentation
    msg={r.head(errors)}
    onDismiss={() => dispatch(errorsDismissedFirst())}
  />;
};
