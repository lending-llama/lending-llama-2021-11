import React from "react";
import {ErrorAlert} from "./ErrorAlert";

// stripped down from starting point: Tailwind UI: "Light nav on gray background"
// https://tailwindui.com/components/application-ui/application-shells/stacked#component-7022793f3a06d980f7d7f8394a057092
export const AppShell = ({children}) => (
  <div className="min-h-full">
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="h-8 w-auto text-3xl">🦙 Lending Llama</span>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <ErrorAlert/>

    <div className="py-10">
      <main>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  </div>
);
