import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import {
  formatStardEndDate,
  formatAmount,
} from "../../function/FormatDateNumber";
import HorizontalProgressBar from "../progress-bar/HorizontalProgressBar";
import { COLORS } from "../../constants";

const TargetItem = ({ targetData }) => {
  return (
    <View
      style={{
        backgroundColor: "white",
        paddingHorizontal: 20,
        paddingVertical: 12,
        marginBottom: 10,
      }}
    >
      <TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Image
              source={{
                uri: targetData.url,
              }}
              style={{
                width: 45,
                height: 45,
              }}
              resizeMode="contain"
            />
            <View style={{ gap: 5 }}>
              <Text
                style={{
                  fontFamily: "InterMedium",
                  fontSize: 16,
                  color: COLORS.textColor2,
                }}
              >
                {targetData.name}
              </Text>
              <Text
                style={{
                  fontFamily: "InterRegular",
                  fontSize: 12,
                  color: COLORS.textColor3,
                }}
              >
                {formatStardEndDate(targetData.start_date, targetData.end_date)}
              </Text>
            </View>
          </View>
          <View>
            {targetData.day_left < 0 && (
              <View
                style={{
                  borderColor: COLORS.expenseChart,
                  borderWidth: 1,
                  alignSelf: "flex-end",
                  paddingHorizontal: 5,
                  paddingVertical: 2,
                  borderRadius: 5,
                  marginBottom: 5,
                  marginTop: -3,
                }}
              >
                <Text
                  style={{
                    fontFamily: "InterRegular",
                    fontSize: 10,
                    color: COLORS.redTarget,
                  }}
                >
                  Expiry
                </Text>
              </View>
            )}

            <Text
              style={{
                fontFamily: "InterMedium",
                fontSize: 16,
                color: COLORS.textColor2,
                alignSelf: "flex-end",
              }}
            >
              {formatAmount(targetData.target)}
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <HorizontalProgressBar
            progress={
              targetData.current > 0
                ? (targetData.current / targetData.target) * 100
                : 0
            }
            color={
              targetData.current / targetData.target >= 1
                ? COLORS.greenTarget
                : COLORS.orangeTarget
            }
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 12,
          }}
        >
          {targetData.day_left >= 0 && (
            <Text
              style={{
                fontFamily: "InterRegular",
                fontSize: 12,
                color: COLORS.textColor3,
              }}
            >
              {targetData.day_left} days left
            </Text>
          )}

          <View style={{ flex: 1 }} />

          {targetData.dif_balance > 0 ? (
            <Text
              style={{
                fontFamily: "InterRegular",
                fontSize: 12,
                color: COLORS.greenTarget,
              }}
            >
              Over {formatAmount(targetData.dif_balance)}
            </Text>
          ) : (
            <Text
              style={{
                fontFamily: "InterRegular",
                fontSize: 12,
                color:
                  targetData.current > 0 ? COLORS.textColor2 : COLORS.redTarget,
              }}
            >
              {formatAmount(targetData.current)}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default TargetItem;

const styles = StyleSheet.create({});
