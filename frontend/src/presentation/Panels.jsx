import React from "react";

/*
 cp. https://tailwindui.com/components/application-ui/layout/panels
 */

export const Card = ({children}) =>
  <div className="bg-white overflow-hidden shadow rounded-lg">
    <div className="px-4 py-5 sm:p-6">
      {children}
    </div>
  </div>
