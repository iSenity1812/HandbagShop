import React from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Path } from "react-native-svg";

const SCALLOP_SIZE = 12;
const RADIUS = 6;

export default function ScallopedBorder({ children, borderColor = "#e5e5e5" }: { children: React.ReactNode; borderColor?: string }) {
  return (
    <View style={[styles.container, { borderColor }]}>

      {/* Top scallop */}
      <Svg
        height={RADIUS}
        width="100%"
        style={styles.top}
      >
        <Path
          d={createScallopPath(true)}
          stroke={borderColor}
          fill="none"
          strokeWidth={2}
        />
      </Svg>

      {children}

      {/* Bottom scallop */}
      <Svg
        height={RADIUS}
        width="100%"
        style={styles.bottom}
      >
        <Path
          d={createScallopPath(false)}
          stroke={borderColor}
          fill="none"
          strokeWidth={2}
        />
      </Svg>
    </View>
  );
}

function createScallopPath(isTop) {
  const r = RADIUS;
  const step = SCALLOP_SIZE;

  let path = "";
  for (let x = 0; x < 1000; x += step) {
    const mid = x + r;

    if (isTop) {
      path += `M ${x} 0 A ${r} ${r} 0 0 1 ${mid} ${r} `;
    } else {
      path += `M ${x} ${r} A ${r} ${r} 0 0 0 ${mid} 0 `;
    }
  }

  return path;
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 12,
    position: "relative",
    overflow: "hidden",

    shadowColor: "#f43f5e",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 12,
    elevation: 3,
  },

  top: {
    position: "absolute",
    top: -1,
    left: 0,
  },

  bottom: {
    position: "absolute",
    bottom: -1,
    left: 0,
  },
});