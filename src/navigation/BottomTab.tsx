import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import { View } from 'react-native';

import Logo from '~/components/Logo';
import createStyles from '~/utils/styles/createStyles';
import { BottomTabStackParams, Routes } from './routes';

import CartBarIcon from '~/assets/svg/CartBarIcon';
import HomeBarIcon from '~/assets/svg/HomeBarIcon';
import CartNavigator from '~/screens/Cart/navigation/CartNavigator';
import HomeNavigator from '~/screens/Home/navigation/HomeNavigator';
import SettingsNavigator from '~/screens/Settings/navigation/SettingsNavigator';
import { useOnboarding } from '~/utils/hocs/useOnboarding';

const { HOME, CART, SETTINGS } = Routes;

const Tab = createBottomTabNavigator<BottomTabStackParams>();

function BottomTab() {
  useOnboarding();

  return (
    <Tab.Navigator screenOptions={getScreenOptions}>
      <Tab.Screen name={HOME} component={HomeNavigator} />
    </Tab.Navigator>
  );
}

const getScreenOptions: (props: { route: RouteProp<ParamListBase>; navigation: any }) => any = ({
  route,
}) => ({
  headerShown: false,
  tabBarShowLabel: false,
  tabBarStyle: [styles.tabBarStyle],

  tabBarIcon: ({ focused }: { focused: boolean }) => {
    let icon;

    switch (route.name) {
      case HOME:
        icon = <HomeBarIcon />;
        break;
      case CART:
        icon = <CartBarIcon />;
        break;
      case SETTINGS:
        icon = <Logo size={24} />;

        break;

      default:
        break;
    }

    return <View style={[styles.iconWrapper, focused && styles.focusedIconWrapper]}>{icon}</View>;
  },
});

const styles = createStyles(({ colors }) => ({
  tabBarStyle: {
    backgroundColor: colors.primary,
    borderTopColor: colors.secondary,
    borderTopWidth: 1,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  focusedIconWrapper: {
    backgroundColor: colors.secondary,
    borderRadius: 100,
  },
}));

export default BottomTab;
