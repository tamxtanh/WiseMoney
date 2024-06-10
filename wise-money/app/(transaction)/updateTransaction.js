import {
  Stack,
  useLocalSearchParams,
  Link,
  useGlobalSearchParams,
} from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { icons, COLORS, SIZES } from "../../constants";
import InputTransaction from "../../components/transaction/InputTransaction";
import { useState, useEffect, useRef } from "react";
import {
  uploadImage,
  handlePickImage,
  handleTakePhoto,
} from "../../components/image-function/ImageHandler";
import DateTimePickerCustom from "../../components/modal-calendar/DateTimePickerCustom";
import { useKeyboard } from "../../context/KeyboardContext";
import ListSmallContact from "../../components/contact/ListSmallContact";
import { supabase } from "../../lib/supabase";
import { CheckBox } from "react-native-elements";

export default function Page() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [noteContent, setNoteContent] = useState("");
  const [contactContent, setContactContent] = useState("");
  const [category, setCategory] = useState();
  const [typeTransaction, setTypeTransaction] = useState();

  const [transactDate, setTransactDate] = useState(new Date());
  const [remindDate, setRemindDate] = useState();
  const [isChecked, setIsChecked] = useState(false);

  const localParams = useGlobalSearchParams();

  const textInputRef = useRef(null);
  const { openKeyboard, inputValue, setInputValue } = useKeyboard();

  const formatDate = (dateObj) => {
    const year = dateObj.getUTCFullYear();
    const month = dateObj.getUTCMonth();
    const date = dateObj.getUTCDate();

    // Create a new Date object with only the date components
    return new Date(Date.UTC(year, month, date));
  };

  const formatAmount = (value) => {
    // Remove commas from the string
    const numberString = value.replace(/,/g, "");

    // Convert the string to a number
    return parseInt(numberString); // For integer value
  };

  const splitContactList = (list) => {
    return list.split(", ").filter((contact) => contact.trim() !== "");
  };

  const handleOpenKeyboard = () => {
    openKeyboard(); // Call the openKeyboard function from the context
    if (textInputRef.current) {
      textInputRef.current.blur();
    }
  };

  useEffect(() => {
    // Update noteContent
    if (typeof localParams.note === "string") {
      setNoteContent(localParams.note);
    }

    // Update contactContent
    if (typeof localParams.contact === "string") {
      setContactContent(localParams.contact);
    }

    // Update contactContent
    if (typeof localParams.categoryImg === "string") {
      setCategory((prevCategory) => ({
        ...prevCategory,
        img: localParams.categoryImg,
      }));
    }

    // Update contactContent
    if (typeof localParams.categoryId === "string") {
      setCategory((prevCategory) => ({
        ...prevCategory,
        id: localParams.categoryId,
      }));
    }

    // Update contactContent
    if (typeof localParams.categoryName === "string") {
      setCategory((prevCategory) => ({
        ...prevCategory,
        name: localParams.categoryName,
      }));
    }

    // Update contactContent
    if (typeof localParams.typeTransaction === "string") {
      setTypeTransaction(localParams.typeTransaction);
    }
  }, [localParams.source, localParams.note, localParams.contact, localParams]);

  const handleSave = () => {
    const insertExpenseRow = async (formData) => {
      try {
        const { data, error } = await supabase
          .from("Expense")
          .insert([
            {
              category: formData.categoryId,
              amount: formData.amount,
              date: formData.date,
              note: formData.note,
              remind: formData.remind,
              image: formData.image,
              exception: formData.exception,
            },
          ])
          .select("id")
          .single();

        if (error) throw error;

        return data.id;
      } catch (error) {
        console.error(error.message);
      }
    };

    const insertIncomeRow = async (formData) => {
      try {
        const { data, error } = await supabase
          .from("Income")
          .insert([
            {
              category: formData.categoryId,
              amount: formData.amount,
              date: formData.date,
              note: formData.note,
              remind: formData.remind,
              image: formData.image,
              exception: formData.exception,
            },
          ])
          .select("id")
          .single();
        if (error) throw error;

        return data.id;
      } catch (error) {
        console.error(error.message);
      }
    };

    const insertDebtRow = async (formData) => {
      try {
        const { data, error } = await supabase
          .from("Debt")
          .insert([
            {
              category: formData.categoryId,
              amount: formData.amount,
              date: formData.date,
              note: formData.note,
              remind: formData.remind,
              image: formData.image,
              exception: formData.exception,
            },
          ])
          .select("id")
          .single();
        if (error) throw error;

        return data.id;
      } catch (error) {
        console.error(error.message);
      }
    };

    const insertLoanRow = async (formData) => {
      try {
        const { data, error } = await supabase
          .from("Loan")
          .insert([
            {
              category: formData.categoryId,
              amount: formData.amount,
              date: formData.date,
              note: formData.note,
              remind: formData.remind,
              image: formData.image,
              exception: formData.exception,
            },
          ])
          .select("id")
          .single();
        if (error) throw error;

        return data.id;
      } catch (error) {
        console.error(error.message);
      }
    };

    const insertContact = (idTran, type, contactContent) => {
      if (contactContent) {
        const contactList = splitContactList(contactContent);
        const contentInsert = contactList.map((item, index) => {
          return {
            name: item,
          };
        });

        const insertManyContacts = async (contentInsert) => {
          try {
            const { data, error } = await supabase
              .from("Contact")
              .insert(contentInsert)
              .select("id");

            if (error) throw error;

            return data;
          } catch (error) {
            console.error(error.message);
          }
        };

        const insertManyContactTransaction = async (idTransaction, type) => {
          const idContacts = await insertManyContacts(contentInsert);
          const contactTransactionList = idContacts.map((item) => {
            return {
              transaction: idTransaction,
              contact: item.id,
              type: type,
            };
          });

          try {
            const { data, error } = await supabase
              .from("ContactTransaction")
              .insert(contactTransactionList)
              .select("id");

            if (error) throw error;
          } catch (error) {
            console.error(error.message);
          }
        };

        insertManyContactTransaction(idTran, type);
      }
    };

    const insertRemindRow = async (remindDate, userId) => {
      try {
        const { data, error } = await supabase
          .from("Remind")
          .insert([{ time: remindDate, user: userId }])
          .select("id")
          .single();

        if (error) throw error;
        return data.id;
      } catch (error) {
        console.error(error.message);
      }
    };

    const insertImageRow = async (name, desc, url) => {
      try {
        const { data, error } = await supabase
          .from("Image")
          .insert([{ name: name, description: desc, url: url }])
          .select("id")
          .single();
        if (error) {
          throw error;
        }

        return data.id;
      } catch (error) {
        console.error(error.message);
      }
    };

    let transactionData = {
      categoryId: Number(category?.id),
      amount: formatAmount(inputValue),
      date: formatDate(transactDate),
      note: noteContent,
      exception: isChecked,
    };

    const insertTransaction = async () => {
      if (remindDate) {
        const remindId = await insertRemindRow(remindDate, 1);

        transactionData = {
          ...transactionData,
          remind: remindId,
        };
      }

      if (selectedImage) {
        const imageName = transactDate.toISOString().substring(0, 10);
        const urlImage = await uploadImage(selectedImage, "transaction");
        const idImage = await insertImageRow(
          imageName,
          typeTransaction,
          urlImage
        );
        transactionData = {
          ...transactionData,
          image: idImage,
        };

        console.log("transactionData", transactionData);
      }

      switch (typeTransaction) {
        case "expense": {
          const id = await insertExpenseRow(transactionData);
          insertContact(id, typeTransaction, contactContent);
          break;
        }
        case "income": {
          const id = await insertIncomeRow(transactionData);
          insertContact(id, typeTransaction, contactContent);
          break;
        }
        ///???
        case "debtLoan": {
          const id = await insertExpenseRow(transactionData);
          insertContact(id, typeTransaction, contactContent);
          break;
        }
      }
    };

    insertTransaction();
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          // headerLeft: () => <icons.close fill="white" width={26} height={26} />,
          headerTitle: () => (
            <View style={{ marginLeft: 0 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "InterSemiBold",
                  color: "white",
                }}
              >
                Add Transactions
              </Text>
            </View>
          ),
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          //headerShadowVisible: false,
          headerTitleAlign: "center",
        }}
      />

      <ScrollView
        style={{ flex: 1, marginBottom: SIZES.heightBottomNavigation }}
      >
        <View style={[styles.inputAmount, styles.inputBox]}>
          <Text
            style={{
              marginBottom: 14,
              marginRight: 10,
              fontFamily: "InterMedium",
              fontSize: 14,
              textAlign: "right",
            }}
          >
            Amount
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 5,
            }}
          >
            <TextInput
              ref={textInputRef}
              style={{
                flex: 1,
                height: 40,
                borderColor: COLORS.primary,
                borderBottomWidth: 2,
                paddingBottom: 3,
                fontSize: 26,
                color: COLORS.primary,
                fontFamily: "InterSemiBold",
                textAlign: "right",
              }}
              placeholder="0"
              placeholderTextColor={COLORS.primary}
              value={inputValue}
              onChangeText={setInputValue}
              onFocus={handleOpenKeyboard}
              showSoftInputOnFocus={false}
            />

            <Text
              style={{
                //flex: 0.1,
                fontFamily: "InterSemiBold",
                fontSize: 20,
                marginRight: 10,
                textAlign: "right",
              }}
            >
              đ
            </Text>
          </View>
        </View>

        <View style={[styles.inforTransaction, styles.inputBox]}>
          <Link
            href={{
              pathname: "/categoryList",
              params: { previousPage: "add-transaction" },
            }}
            style={{ padding: 0 }}
          >
            <InputTransaction
              iconSvg={
                category?.img ? (
                  <Image
                    source={{ uri: category.img }}
                    style={{
                      width: 38,
                      height: 38,
                    }}
                    resizeMode="contain"
                  />
                ) : (
                  <icons.questionMark />
                )
              }
              title={category?.name ? category.name : "Select category"}
              iconBoxStyle={category ? styles.iconImageBox : styles.iconSvgBox}
              textInputTransaction={[
                styles.textInputTransaction,
                { color: category ? "#010101" : COLORS.textColor3 },
              ]}
            />
          </Link>

          <Link
            href={{
              pathname: "/note",
              params: {
                previousPage: "add-transaction",
                oldContent: noteContent,
              },
            }}
            style={{ padding: 0 }}
          >
            <InputTransaction
              iconSvg={<icons.notes />}
              title={noteContent ? noteContent : "Write note"}
              textInputTransaction={[
                styles.textInputTransaction2,
                { color: noteContent ? "#010101" : COLORS.textColor3 },
              ]}
            />
          </Link>

          <DateTimePickerCustom
            selectedDate={transactDate}
            setSelectedDate={setTransactDate}
            iconSvg={<icons.calenderClock />}
          />

          {/* <InputTransaction
            iconSvg={<icons.wallet2 />}
            title="First Wallet"
            textInputTransaction={styles.textInputTransaction3}
          /> */}
        </View>

        <View style={[styles.detailTransaction, styles.inputBox]}>
          <Link
            href={{
              pathname: "/contact",
              params: {
                previousPage: "add-transaction",
                oldContent: contactContent,
              },
            }}
            style={{ padding: 0 }}
          >
            <InputTransaction
              iconSvg={<icons.groupUser />}
              title={contactContent ? contactContent : "With"}
              textInputTransaction={[
                styles.textInputTransaction3,
                { color: contactContent ? "#010101" : COLORS.textColor3 },
              ]}
              isHaveChildren={contactContent.length > 0 ? true : false}
              children={
                <ListSmallContact nameList={splitContactList(contactContent)} />
              }
            />
          </Link>

          <DateTimePickerCustom
            dateTimeMode={true}
            selectedDate={remindDate}
            setSelectedDate={setRemindDate}
            iconSvg={<icons.alarm />}
          />
        </View>

        <View
          style={[
            styles.inputBox,
            { paddingHorizontal: 14, paddingVertical: 21 },
          ]}
        >
          <View style={[styles.photos]}>
            <TouchableOpacity
              style={[
                styles.photoBox,
                { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
              ]}
              onPress={() => handlePickImage(setSelectedImage)}
            >
              <icons.addPhoto />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.photoBox,
                { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 },
              ]}
              onPress={() => handleTakePhoto(setSelectedImage)}
            >
              <icons.takePhoto />
            </TouchableOpacity>
          </View>

          {selectedImage && (
            <View
              style={{
                marginTop: 21,
                flex: 1,
                backgroundColor: "#EAEAEA",
                paddingHorizontal: 20,
                borderRadius: 5,
                alignItems: "center",
                position: "relative",
              }}
            >
              <Image
                source={{ uri: selectedImage }}
                style={{ height: 200, width: 250 }}
              />

              <View
                style={{
                  backgroundColor: "#EF5363",
                  borderRadius: 30,
                  position: "absolute",
                  right: -6,
                  top: -11,
                  padding: 2,
                }}
              >
                <TouchableOpacity onPress={() => setSelectedImage("")}>
                  <icons.close fill="white" width={19} height={19} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        <View
          style={[
            styles.inputBox,
            {
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 5,
              paddingVertical: 15,
            },
          ]}
        >
          <CheckBox
            checked={isChecked}
            iconType="material-community"
            checkedIcon="checkbox-marked"
            uncheckedIcon="checkbox-blank-outline"
            onPress={() => setIsChecked(!isChecked)}
            checkedColor={COLORS.primary}
          />
          <View>
            <Text
              style={{
                fontFamily: "InterMedium",
                fontSize: 13,
                color: "#010101",
              }}
            >
              Exclude from report
            </Text>
            <Text
              style={{
                fontFamily: "InterMedium",
                fontSize: 12,
                color: COLORS.textColor3,
              }}
            >
              Don't include this transaction in reports
            </Text>
          </View>
        </View>

        {/* <View style={[styles.hideDetail, styles.inputBox]}>
          <Text
            style={{
              color: COLORS.primary,
              fontFamily: "InterMedium",
              fontSize: 16,
            }}
          >
            Hide Details
          </Text>

          <icons.arrowDropDown />
        </View> */}

        {/* <View style={styles.saveBtn}>
          <TouchableOpacity
            style={{
              backgroundColor:
                !inputValue || !category ? "#dfdfdf" : COLORS.primary,
              alignItems: "center",
              justifyContent: "center",
              padding: 14,
              borderRadius: 7,
            }}
            disabled={!inputValue || !category}
            onPress={handleSave}
          >
            <Text
              style={{
                color: !inputValue || !category ? COLORS.textColor3 : "#FCFCFC",
                fontFamily: "InterSemiBold",
                fontSize: 18,
              }}
            >
              Save
            </Text>
          </TouchableOpacity>
        </View> */}

        <View style={styles.saveDeleteBtn}>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: "white",
              alignItems: "center",
              justifyContent: "center",
              padding: 14,
              borderRadius: 7,
              borderWidth: 1,
              borderColor: "#ED5D5D",
            }}
          >
            <Text
              style={{
                color: "#ED5D5D",
                fontFamily: "InterSemiBold",
                fontSize: 18,
              }}
            >
              Delete
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: COLORS.primary,
              alignItems: "center",
              justifyContent: "center",
              padding: 14,
              borderRadius: 7,
            }}
          >
            <Text
              style={{
                color: "#FCFCFC",
                fontFamily: "InterSemiBold",
                fontSize: 18,
              }}
            >
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F3F8",
    position: "relative",
  },
  inputBox: {
    backgroundColor: "white",
    marginBottom: 10,
  },
  inputAmount: {
    padding: 10,
    paddingBottom: 15,
  },
  textInputTransaction2: {
    fontFamily: "InterMedium",
    fontSize: 15,
    color: COLORS.textColor3,
  },
  textInputTransaction3: {
    fontFamily: "InterMedium",
    fontSize: 15,
    color: "#010101",
  },
  iconSvgBox: {
    backgroundColor: "#CCCCCC",
    borderRadius: 50,
  },
  iconImageBox: {
    marginLeft: -7,
    marginRight: -10,
  },
  textInputTransaction: {
    fontFamily: "InterMedium",
    color: COLORS.textColor3,
    fontSize: 20,
  },
  photos: {
    flexDirection: "row",
    alignItems: "center",
  },
  photoBox: {
    borderRadius: 3,
    borderColor: "#999999",
    borderWidth: 0.2,
    flex: 1,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  hideDetail: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  saveBtn: {
    paddingTop: 5,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  saveDeleteBtn: {
    paddingTop: 5,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
});
