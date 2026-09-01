import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Card, CardContent } from './ui/card';
export const TaskSummary = ({ total, active, completed }) => {
    return (_jsxs("div", { className: "grid grid-cols-3 gap-4 w-full", children: [_jsx(Card, { children: _jsxs(CardContent, { className: "pt-6 text-center", children: [_jsx("p", { className: "text-xs text-muted-foreground", children: " Total " }), _jsx("div", { className: "text-2xl font-bold", children: total })] }) }), _jsx(Card, { children: _jsxs(CardContent, { className: "pt-6 text-center", children: [_jsx("p", { className: "text-xs text-muted-foreground", children: " \u00C0 faire " }), _jsx("div", { className: "text-2xl font-bold text-yellow-600 dark:text-yellow-400", children: active })] }) }), _jsx(Card, { children: _jsxs(CardContent, { className: "pt-6 text-center", children: [_jsx("p", { className: "text-xs text-muted-foreground", children: " Termin\u00E9es " }), _jsx("div", { className: "text-2xl font-bold text-green-600 dark:text-green-400", children: completed })] }) })] }));
};
