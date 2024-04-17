import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  TextInput,
} from "react-native";
import { Styles } from "../../components/Currency/styles";
import dataCurrency from "../../components/Currency/CommonCurrency.json";
import { DialogCurrency } from "../../components/Currency/components";
import { CurrencyFlag } from "../../components/Currency/components";
import { COLORS } from "../../constants";

export default CurrencyPicker = (props) => {
  const currencies = Object.values(dataCurrency);

  const [currencyName, setCurrencyName] = useState("US Dollar");
  const [code, setCode] = useState("USD");
  // const [symbol, setSymbol] = useState("$");
  // const [symbolNative, setSymbolNative] = useState("$");
  const [visible, setVisible] = useState(false);

  const {
    onSelectCurrency,
    currencyCode,
    // showFlag = true,
    showCurrencyName = true,
    showSymbol = false,
    showNativeSymbol = true,
    darkMode = false,
    showCurrencyCode = true,

    currencyPickerRef,
    enable = true,
    // onOpen,
    // onClose,

    containerStyle = {},
    modalStyle = {},

    title,
    searchPlaceholder,
    textEmpty,
    showCloseButton = true,
    showModalTitle = true,
  } = props;

  const {
    container,
    // flagWidth = 25,
    currencyCodeStyle,
    currencyNameStyle,
    // symbolStyle,
    // symbolNativeStyle,
  } = containerStyle;

  useEffect(() => {
    let currency = undefined;
    currencyPickerRef && currencyPickerRef(currencyRef);

    if (currencyCode) {
      currency = currencies.filter((item) => item.code === currencyCode)[0];
    }

    if (currency) {
      const { code, symbol, symbol_native, name } = currency;
      setCurrencyName(name);
      setCode(code);
      // setSymbol(symbol);
      // setSymbolNative(symbol_native);
    }
  }, [props]);

  const currencyRef = {
    open: () => {
      setVisible(true);
      // onOpen && onOpen();
    },
    close: () => {
      setVisible(false);
      //onClose && onClose();
    },
  };

  const onSelect = (data) => {
    const { code, symbol, symbol_native, name } = data;
    onSelectCurrency && onSelectCurrency(data);
    setCurrencyName(name);
    setCode(code);
    // setSymbol(symbol);
    // setSymbolNative(symbol_native);
  };

  return (
    <View>
      {enable ? (
        <View
          style={{
            position: "relative",
          }}
        >
          <TextInput
            style={{
              height: 50,
              borderColor: "#EEEEF0",
              borderBottomWidth: 1,
              padding: 10,
              fontSize: 18,
              color: "#000000",
              fontFamily: "InterSemiBold",
            }}
            placeholder={showCurrencyName ? currencyName : ""}
            placeholderTextColor="#000000"
            readOnly
          />

          <TouchableOpacity
            style={{
              position: "absolute",
              top: 35,
              right: 5,
            }}
            onPress={() => {
              setVisible(true);
              //onOpen && onOpen();
            }}
          >
            <Text
              style={{
                top: -16,
                right: 18,
                color: COLORS.primary,
                fontFamily: "InterSemiBold",
                fontSize: 13,
              }}
            >
              EDIT
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
      <Modal visible={visible}>
        <DialogCurrency
          onSelectItem={(data) => {
            onSelect(data);
          }}
          setVisible={(value) => {
            setVisible(value);
            // onClose && onClose();
          }}
          title={title}
          searchPlaceholder={searchPlaceholder}
          textEmpty={textEmpty}
          darkMode={darkMode}
          modalStyle={modalStyle}
          showCloseButton={showCloseButton}
          showModalTitle={showModalTitle}
          showCurrencySymbol={showSymbol}
          showCurrencyNativeSymbol={showNativeSymbol}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  txtCountryName: {
    ...Styles.fontDefault,
    marginLeft: 10,
  },
  txtCurrencyCode: {
    ...Styles.fontDefault,
    marginLeft: 10,
    fontWeight: "600",
  },
});

// export default CurrencyPicker = (props) => {
//   const currencies = Object.values(dataCurrency);

//   const [currencyName, setCurrencyName] = useState("US Dollar");
//   const [code, setCode] = useState("USD");
//   const [symbol, setSymbol] = useState("$");
//   const [symbolNative, setSymbolNative] = useState("$");
//   const [visible, setVisible] = useState(false);

//   const {
//     onSelectCurrency,
//     currencyCode,
//     showFlag = true,
//     showCurrencyName = true,
//     showSymbol = false,
//     showNativeSymbol = true,
//     darkMode = true,
//     renderChildren,
//     showCurrencyCode = true,

//     currencyPickerRef,
//     enable = true,
//     onOpen,
//     onClose,

//     containerStyle = {},
//     modalStyle = {},

//     title,
//     searchPlaceholder,
//     textEmpty,
//     showCloseButton = true,
//     showModalTitle = true,
//   } = props;

//   const {
//     container,
//     flagWidth = 25,
//     currencyCodeStyle,
//     currencyNameStyle,
//     symbolStyle,
//     symbolNativeStyle,
//   } = containerStyle;

//   useEffect(() => {
//     let currency = undefined;
//     currencyPickerRef && currencyPickerRef(currencyRef);

//     if (currencyCode) {
//       currency = currencies.filter((item) => item.code === currencyCode)[0];
//     }

//     if (currency) {
//       const { code, symbol, symbol_native, name } = currency;
//       setCurrencyName(name);
//       setCode(code);
//       setSymbol(symbol);
//       setSymbolNative(symbol_native);
//     }
//   }, [props]);

//   const currencyRef = {
//     open: () => {
//       setVisible(true);
//       onOpen && onOpen();
//     },
//     close: () => {
//       setVisible(false);
//       onClose && onClose();
//     },
//   };

//   const onSelect = (data) => {
//     const { code, symbol, symbol_native, name } = data;
//     onSelectCurrency && onSelectCurrency(data);
//     setCurrencyName(name);
//     setCode(code);
//     setSymbol(symbol);
//     setSymbolNative(symbol_native);
//   };

//   return (
//     <View>
//       {enable ? (
//         <TouchableOpacity
//           onPress={() => {
//             setVisible(true);
//             onOpen && onOpen();
//           }}
//           style={[Styles.justifyContent, container]}
//         >
//           {renderChildren ? (
//             renderChildren
//           ) : (
//             <View style={{ flexDirection: "row" }}>
//               {showFlag && <CurrencyFlag currency={code} width={flagWidth} />}
//               {showCurrencyCode && (
//                 <Text style={[styles.txtCurrencyCode, currencyCodeStyle]}>
//                   {code}
//                 </Text>
//               )}
//               {showCurrencyName && (
//                 <Text style={[styles.txtCountryName, currencyNameStyle]}>
//                   {currencyName}
//                 </Text>
//               )}
//               {showSymbol && (
//                 <Text style={[styles.txtCountryName, symbolStyle]}>
//                   {symbol}
//                 </Text>
//               )}
//               {showNativeSymbol && (
//                 <Text style={[styles.txtCountryName, symbolNativeStyle]}>
//                   {symbolNative}
//                 </Text>
//               )}
//             </View>
//           )}
//         </TouchableOpacity>
//       ) : null}
//       <Modal visible={visible}>
//         <DialogCurrency
//           onSelectItem={(data) => {
//             onSelect(data);
//           }}
//           setVisible={(value) => {
//             setVisible(value);
//             onClose && onClose();
//           }}
//           title={title}
//           searchPlaceholder={searchPlaceholder}
//           textEmpty={textEmpty}
//           darkMode={darkMode}
//           modalStyle={modalStyle}
//           showCloseButton={showCloseButton}
//           showModalTitle={showModalTitle}
//           showCurrencySymbol={showSymbol}
//           showCurrencyNativeSymbol={showNativeSymbol}
//         />
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   txtCountryName: {
//     ...Styles.fontDefault,
//     marginLeft: 10,
//   },
//   txtCurrencyCode: {
//     ...Styles.fontDefault,
//     marginLeft: 10,
//     fontWeight: "600",
//   },
// });
