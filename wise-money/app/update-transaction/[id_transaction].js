import {
  Stack,
  useLocalSearchParams,
  Link,
  useGlobalSearchParams,
  router,
} from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
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
import SupabaseSingleton from "../../lib/supabaseSingleton";
import { CheckBox } from "react-native-elements";

export default function Page() {
  const supabase = SupabaseSingleton.getInstance().getClient();
  const [selectedImage, setSelectedImage] = useState(null);
  const [noteContent, setNoteContent] = useState("");
  const [contactContent, setContactContent] = useState("");
  const [category, setCategory] = useState();
  const [typeTransaction, setTypeTransaction] = useState();
  const [typeCategory, setTypeCategory] = useState();

  const [transactDate, setTransactDate] = useState(new Date());
  const [remindDate, setRemindDate] = useState();
  const [isChecked, setIsChecked] = useState(false);

  const [detailTransaction, setDetailTransaction] = useState();

  const localParams = useGlobalSearchParams();

  const textInputRef = useRef(null);
  const { openKeyboard, inputValue, setInputValue } = useKeyboard();

  const formatDate = (dateObj) => {
    // const year = dateObj.getUTCFullYear();
    // const month = dateObj.getUTCMonth();
    // const date = dateObj.getUTCDate();

    // // Create a new Date object with only the date components
    // return new Date(Date.UTC(year, month, date));

    return `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${dateObj.getDate().toString().padStart(2, "0")}`;
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
      setTypeCategory(localParams.typeTransaction);
    }

    if (typeof localParams.typeCategory === "string") {
      setTypeCategory(localParams.typeCategory);
    }
  }, [localParams.source, localParams.note, localParams.contact, localParams]);

  const addCommasToNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const updateTransactionDetail = (data) => {
    setInputValue(addCommasToNumber(data.amount));
    setCategory({
      id: data.category_id,
      img: data.category_img,
      name: data.category_name,
    });
    setTransactDate(new Date(data.date));
    if (data.note !== null) {
      setNoteContent(data.note);
    }
    if (data.image !== null) {
      setSelectedImage(data.image);
    }
    setIsChecked(data.exception);
    if (data.remind !== null) {
      setRemindDate(new Date(data.remind));
    }
    if (data.contact_names !== null) {
      const contactNamesString = data.contact_names.join(", ");
      setContactContent(contactNamesString);
    }
  };

  useEffect(() => {
    async function fetchDetailTransaction(transactionId, transactionType) {
      try {
        let { data, error } = await supabase.rpc("get_transaction_details", {
          transaction_id: transactionId,
          transaction_type: transactionType,
        });

        if (error) throw error;
        else {
          updateTransactionDetail(data[0]);
          setDetailTransaction(data[0]);
        }
      } catch (error) {
        console.error(error);
      }
    }
    if (typeTransaction) {
      fetchDetailTransaction(localParams.id_transaction, typeTransaction);
    }
  }, [typeTransaction]);

  const handleInsert = (type) => {
    const insertExpenseRow = async (formData) => {
      try {
        const { data, error } = await supabase
          .from("Expense")
          .insert([
            {
              category: formData.categoryId,
              wallet: formData.walletId,
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
              wallet: formData.walletId,
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
              wallet: formData.walletId,
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
              wallet: formData.walletId,
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
      walletId: 1,
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
        const idImage = await insertImageRow(imageName, type, urlImage);
        transactionData = {
          ...transactionData,
          image: idImage,
        };
      }

      switch (type) {
        case "expense": {
          const id = await insertExpenseRow(transactionData);
          insertContact(id, type, contactContent);
          return id;
          break;
        }
        case "income": {
          const id = await insertIncomeRow(transactionData);
          insertContact(id, type, contactContent);
          return id;
          break;
        }

        case "debt": {
          const id = await insertDebtRow(transactionData);
          insertContact(id, type, contactContent);
          return id;
          break;
        }
        case "loan": {
          const id = await insertLoanRow(transactionData);
          insertContact(id, type, contactContent);
          return id;
          break;
        }
      }
    };

    return insertTransaction();
  };

  const handleUpdate = () => {
    const updateExpenseRow = async (formData) => {
      try {
        const { data, error } = await supabase
          .from("Expense")
          .update({
            category: formData.categoryId,
            wallet: formData.walletId,
            amount: formData.amount,
            date: formData.date,
            note: formData.note,
            remind: formData.remind,
            image: formData.image,
            exception: formData.exception,
          })
          .eq("id", localParams.id_transaction)
          .select();

        if (error) throw error;

        return data;
      } catch (error) {
        console.error(error.message);
      }
    };

    const updateIncomeRow = async (formData) => {
      try {
        const { data, error } = await supabase
          .from("Income")
          .update({
            category: formData.categoryId,
            wallet: formData.walletId,
            amount: formData.amount,
            date: formData.date,
            note: formData.note,
            remind: formData.remind,
            image: formData.image,
            exception: formData.exception,
          })
          .eq("id", localParams.id_transaction)
          .select();

        if (error) throw error;

        return data;
      } catch (error) {
        console.error(error.message);
      }
    };

    const updateDebtRow = async (formData) => {
      try {
        const { data, error } = await supabase
          .from("Debt")
          .update({
            category: formData.categoryId,
            wallet: formData.walletId,
            amount: formData.amount,
            date: formData.date,
            note: formData.note,
            remind: formData.remind,
            image: formData.image,
            exception: formData.exception,
          })
          .eq("id", localParams.id_transaction)
          .select();

        if (error) throw error;

        return data;
      } catch (error) {
        console.error(error.message);
      }
    };

    const updateLoanRow = async (formData) => {
      try {
        const { data, error } = await supabase
          .from("Loan")
          .update({
            category: formData.categoryId,
            wallet: formData.walletId,
            amount: formData.amount,
            date: formData.date,
            note: formData.note,
            remind: formData.remind,
            image: formData.image,
            exception: formData.exception,
          })
          .eq("id", localParams.id_transaction)
          .select();

        if (error) throw error;

        return data;
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
      walletId: 1,
      amount: formatAmount(inputValue),
      date: formatDate(transactDate),
      note: noteContent,
      exception: isChecked,
    };

    const updateTransaction = async () => {
      if (remindDate) {
        let remindId;
        if (remindDate !== detailTransaction.remind) {
          remindId = await insertRemindRow(remindDate, 1);
        } else {
          remindId = detailTransaction.remind_id;
        }

        transactionData = {
          ...transactionData,
          remind: remindId,
        };
      }

      if (selectedImage !== detailTransaction.image) {
        let idImage;
        if (selectedImage) {
          const imageName = transactDate.toISOString().substring(0, 10);
          const urlImage = await uploadImage(selectedImage, "transaction");
          idImage = await insertImageRow(imageName, typeCategory, urlImage);
        } else {
          idImage = null;
        }

        transactionData = {
          ...transactionData,
          image: idImage,
        };
      }

      let updateResult;
      switch (typeCategory) {
        case "expense": {
          updateResult = updateExpenseRow(transactionData);
          const contactNamesString =
            detailTransaction.contact_names?.join(", ");
          if (contactContent !== contactNamesString) {
            insertContact(
              localParams.id_transaction,
              typeCategory,
              contactContent
            );
          }
          break;
        }
        case "income": {
          updateResult = updateIncomeRow(transactionData);
          const contactNamesString =
            detailTransaction.contact_names?.join(", ");
          if (contactContent !== contactNamesString) {
            insertContact(
              localParams.id_transaction,
              typeCategory,
              contactContent
            );
          }
          break;
        }

        case "debt": {
          updateResult = updateDebtRow(transactionData);
          const contactNamesString =
            detailTransaction.contact_names?.join(", ");
          if (contactContent !== contactNamesString) {
            insertContact(
              localParams.id_transaction,
              typeCategory,
              contactContent
            );
          }
          break;
        }

        case "loan":
          updateResult = updateLoanRow(transactionData);
          const contactNamesString =
            detailTransaction.contact_names?.join(", ");
          if (contactContent !== contactNamesString) {
            insertContact(
              localParams.id_transaction,
              typeCategory,
              contactContent
            );
          }
          break;
      }

      if (updateResult) {
        // Show success alert and navigate back after a short delay
        Alert.alert(null, "Update successful!", [
          {
            text: "OK",
            onPress: () => {
              router.back();
            },
          },
        ]);
      }
    };

    if (typeCategory !== typeTransaction) {
      const id = handleInsert(typeCategory);
      const result = deleteTransaction(
        typeTransaction,
        localParams.id_transaction
      );
      if (id && result) {
        // Show success alert and navigate back after a short delay
        Alert.alert(null, "Update successful!", [
          {
            text: "OK",
            onPress: () => {
              router.back();
            },
          },
        ]);
      }
    } else {
      updateTransaction();
    }
  };

  const handleDelete = () => {
    Alert.alert(
      null,
      "Are you sure you want to delete this transaction?",
      [
        {
          text: "No",
          style: "cancel",
          onPress: () => console.log("Delete cancelled"),
        },
        {
          text: "Yes",
          onPress: async () => {
            const result = await deleteTransaction(
              typeTransaction,
              localParams.id_transaction
            );
            if (result) {
              Alert.alert(null, "The transaction was successfully deleted!", [
                {
                  text: "OK",
                  onPress: () => {
                    router.back();
                  },
                },
              ]);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const deleteTransaction = (type, id) => {
    switch (type) {
      case "expense":
        return deleteExpenseRow(id);
      case "income":
        return deleteIncomeRow(id);
      case "debt":
        return deleteDebtRow(id);
      case "loan":
        return deleteLoanRow(id);
    }
  };

  const deleteExpenseRow = async (id) => {
    try {
      const { error } = await supabase.from("Expense").delete().eq("id", id);

      if (error) throw error;
      else {
        return true;
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteIncomeRow = async (id) => {
    try {
      const { error } = await supabase.from("Income").delete().eq("id", id);

      if (error) throw error;
      else {
        return true;
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteDebtRow = async (id) => {
    try {
      const { error } = await supabase.from("Debt").delete().eq("id", id);

      if (error) throw error;
      else {
        return true;
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteLoanRow = async (id) => {
    try {
      const { error } = await supabase.from("Loan").delete().eq("id", id);

      if (error) throw error;
      else {
        return true;
      }
    } catch (error) {
      console.error(error.message);
    }
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
                Update Transactions
              </Text>
            </View>
          ),
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          //headerShadowVisible: false,
          headerTitleAlign: "center",
          headerTintColor: "white",
        }}
      />

      <ScrollView style={{ flex: 1 }}>
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
              // defaultValue={inputValue.toString()}
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
              pathname: "/category-list/Select category",
              params: {
                previousPage: `/update-transaction/${localParams.id_transaction}`,
              },
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
                previousPage: `/update-transaction/${localParams.id_transaction}`,
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
                previousPage: `/update-transaction/${localParams.id_transaction}`,
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
            onPress={handleDelete}
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
              backgroundColor:
                !inputValue || !category ? "#dfdfdf" : COLORS.primary,
              alignItems: "center",
              justifyContent: "center",
              padding: 14,
              borderRadius: 7,
            }}
            disabled={!inputValue || !category}
            onPress={handleUpdate}
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
