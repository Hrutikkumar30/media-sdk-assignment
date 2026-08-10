import React from 'react';

export type PropGetter<P = Record<string, unknown>> = (
  props?: P & React.HTMLAttributes<any> & Record<string, any>
) => P & React.HTMLAttributes<any> & Record<string, any>;

export interface IntersectionObserverOptions extends IntersectionObserverInit {
  enabled?: boolean;
}
