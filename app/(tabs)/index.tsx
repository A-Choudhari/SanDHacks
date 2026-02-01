import { Colors } from '@/constants/Colors';
import { MOCK_LOCATIONS } from '@/data/mockData';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.heroContainer}>
        <Image
          source={require('@/assets/images/geisel-sunset.png')}
          style={styles.heroImage}
        />
        <View style={[styles.heroOverlay, { paddingTop: insets.top + 20 }]}>
          <View style={styles.headerRow}>
            <Text style={styles.ucsdLogo}>UC San Diego</Text>
            <Ionicons name="notifications-outline" size={24} color="white" />
          </View>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.greeting}>Good Evening, Akshat!</Text>

        <View style={styles.menuList}>
          <MenuItem
            icon="sparkles-outline"
            text="Recommendations"
            onPress={() => router.push('/recommendations')}
          />
          <MenuItem icon="star-outline" text="Rate Order & Earn 40 Points" />
          <MenuItem icon="scan-outline" text="Just Walk Out" />
          <MenuItem
            icon="thumbs-down-outline"
            text="Dislikes"
            onPress={() => router.push('/dislikes')}
          />

          <MenuItem
            icon="map-outline"
            text="Find Restaurants"
            onPress={() => router.push('/(tabs)/locations')}
          />

          <MenuItem icon="card-outline" text="Check your balances" />
          <MenuItem icon="warning-outline" text="Dining Services is Hiring!" />
          <MenuItem icon="nutrition-outline" text="Nutritionals & Allergen Info" />
          <MenuItem icon="help-circle-outline" text="Dining Support Form" />
        </View>



        <View style={styles.locationsList}>
          {MOCK_LOCATIONS.map(location => (
            <View key={location.id} style={styles.locationSection}>
              <View style={styles.collegeHeader}>
                <Text style={styles.collegeHeaderText}>{location.name.toUpperCase()}</Text>
              </View>
              <View style={styles.stationsList}>
                {location.stations.map((station, index) => (
                  <MenuItem
                    key={station}
                    icon="restaurant-outline"
                    text={station}
                    subtitle="10:00 AM - 8:00 PM"
                    iconColor={Colors.light.primary}
                    arrow
                  />
                ))}
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView >
  );
}

interface MenuItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
  subtitle?: string;
  arrow?: boolean;
  iconColor?: string;
  onPress?: () => void;
}

const MenuItem = React.forwardRef<View, MenuItemProps>(
  ({ icon, text, subtitle, arrow = true, iconColor, onPress, ...props }, ref) => {
    return (
      <TouchableOpacity ref={ref} style={styles.menuItem} onPress={onPress} {...props}>
        <View style={styles.menuItemLeft}>
          <Ionicons name={icon} size={24} color={iconColor || Colors.light.textSecondary} style={styles.menuIcon} />
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuText} numberOfLines={1}>{text}</Text>
            {subtitle && <Text style={styles.menuSubtitle} numberOfLines={1}>{subtitle}</Text>}
          </View>
        </View>
        {arrow && <Ionicons name="chevron-forward" size={20} color={Colors.light.textSecondary} opacity={0.5} />}
      </TouchableOpacity>
    );
  }
);

MenuItem.displayName = 'MenuItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  heroContainer: {
    height: 250,
    width: '100%',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ucsdLogo: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '300',
    textAlign: 'center',
    marginVertical: 24,
    color: Colors.light.text,
  },
  menuList: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  menuTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  menuIcon: {
    marginRight: 16,
    width: 24,
    textAlign: 'center',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '400',
  },
  menuSubtitle: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  collegeHeader: {
    padding: 15,
    paddingHorizontal: 20,
    backgroundColor: '#F5F5F7',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    marginTop: -1,
  },
  collegeHeaderText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  locationsList: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingBottom: 20,
  },
  locationSection: {
    marginBottom: 0,
  },
  locationHeader: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  locationMeta: {
    alignItems: 'flex-end',
  },
  locationStatus: {
    fontSize: 12,
    color: Colors.light.textSecondary,
  },
  locationWait: {
    fontSize: 12,
    color: Colors.light.primary,
    fontWeight: '600',
  },
  stationsList: {
    paddingLeft: 20,
  },
  stationItem: {
    paddingVertical: 12,
    paddingRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  lastStationItem: {
    borderBottomWidth: 0,
  },
  stationName: {
    fontSize: 16,
    color: '#333',
  },
});
