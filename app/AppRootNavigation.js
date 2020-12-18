import { CommonActions, StackActions } from '@react-navigation/native';
import * as React from 'react';

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function push(name, params) {
  navigationRef.current?.dispatch(StackActions.push(name, params));
}

export function back() {
  navigationRef.current?.goBack();
}

export function reset(routeName, params) {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: routeName,
          params: params,
        },
      ],
    }),
  );
}

export function replace(routeName, params) {
  navigationRef.current?.dispatch(StackActions.replace(routeName, params));
}

export function getRoutes() {
  return navigationRef.current?.getRootState().routes;
}

export function getCurrentRoute() {
  return navigationRef.current?.getCurrentRoute();
}

export function setParams(params) {
  return navigationRef.current?.setParams(params);
}

const removeSomeStack = (listRouteNameRemove = [], routeName, params) => (
  state,
) => {
  try {
    console.log('resetStoreStack state', state);
    const routes = [
      ...state.routes.filter(
        (route) => !listRouteNameRemove.includes(route.name),
      ),
      { key: `${routeName}-success`, name: routeName, params },
    ];

    console.log('routes', routes);

    return CommonActions.reset({
      ...state,
      routes,
      index: routes.length - 1,
    });
  } catch (error) {
    console.log('resetStoreStack error', error);
  }
};
const removeSomeStackAndNavigate = (
  listRouteNameRemove = [],
  routeName,
  params,
) => {
  navigationRef.current?.dispatch(
    removeSomeStack(listRouteNameRemove, routeName, params),
  );
};
export default {
  navigate,
  push,
  back,
  reset,
  replace,
  getRoutes,
  getCurrentRoute,
  setParams,
  removeSomeStackAndNavigate,
};
