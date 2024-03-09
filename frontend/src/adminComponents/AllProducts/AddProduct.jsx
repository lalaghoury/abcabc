import {
  Avatar,
  Button,
  Divider,
  Flex,
  Form,
  Image,
  Input,
  Select,
  Table,
  Typography,
  Upload,
  message,
} from "antd";
import React, { useState } from "react";
import "./AddProduct.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  CloudUploadOutlined,
  DeleteOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import axios from "axios";
const { Title } = Typography;
const { Dragger } = Upload;
const { Option } = Select;

const types = [
  {
    value: "Physical",
    label: "Physical",
  },
  {
    value: "Digital",
    label: "Digital",
  },
  {
    value: "Service",
    label: "Service",
  },
];

const categories = [
  {
    value: "Healthcare",
    label: "Healthcare",
  },
  {
    value: "Makeup",
    label: "Makeup",
  },
  {
    value: "Skincare",
    label: "Skincare",
  },
];

const AddProduct = () => {
  const [form] = Form.useForm();
  const [description, setDescription] = useState("");
  const [image_urls, setImage_urls] = useState([]);
  const onFinish = (values) => {
    console.log(values);
  };

  const checkPrice = (_, value) => {
    if (value.price > 0) {
      return Promise.resolve();
    } else if (value.price === 5) {
      return Promise.reject(new Error("Price must be greater than 5!"));
    }
    return Promise.reject(new Error("Price must be greater than 0!"));
  };

  const onDescriptionChange = (value) => {
    setDescription(value);
  };

  return (
    <div className="add-product">
      <Title>Create product</Title>

      <Form
        form={form}
        scrollToFirstError={true}
        onFinish={onFinish}
        className="add-product-form"
        layout="vertical"
        initialValues={{
          type: "Physical",
          category: "Healthcare",
          product: {
            price: 0,
            currency: "USD",
          },
        }}
        validateTrigger="onSubmit"
      >
        <Title level={5}>Basic information</Title>
        <Flex gap={20} justify="space-between">
          <Form.Item
            label="Product name"
            name="name"
            rules={[{ required: true }]}
            style={{ width: "100%" }}
          >
            <Input className="input-md" placeholder="Product Name" />
          </Form.Item>
          <Form.Item
            label="Handle"
            name="handle"
            rules={[{ required: true }]}
            style={{ width: "100%" }}
          >
            <Input className="input-md" placeholder="Handle Name" />
          </Form.Item>
        </Flex>

        <Flex gap={20} justify="space-between">
          <Form.Item
            label="Category"
            name="category"
            className="select"
            rules={[{ required: true }]}
            style={{ width: "100%" }}
          >
            <Select
              style={{ width: "100%" }}
              onChange={(value) => console.log(value)}
            >
              {categories.map((lang) => (
                <Option value={lang.value} key={lang.value}>
                  {lang.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            className="select"
            label="Type"
            name="type"
            rules={[{ required: true }]}
            style={{ width: "100%" }}
          >
            <Select
              style={{ width: "100%" }}
              onChange={(value) => console.log(value)}
            >
              {types.map((lang) => (
                <Option value={lang.value} key={lang.value}>
                  {lang.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Flex>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter a description" }]}
          style={{ width: "100%" }}
        >
          <ProductDescriptionInput
            value={description}
            onChange={onDescriptionChange}
          />
        </Form.Item>

        <Form.Item
          label="Tags"
          name="tags"
          rules={[{ required: true, message: "" }]}
          style={{ width: "100%" }}
        >
          <Flex gap="10px" vertical>
            <Input className="input-md" placeholder="Tags" />
            <p>Tags must be separated by comma</p>
          </Flex>
        </Form.Item>

        <Divider />

        <Title level={5}>Pricing</Title>

        <Form.Item
          name="price"
          label="Price"
          rules={[
            {
              validator: checkPrice,
            },
          ]}
        >
          <PriceInput />
        </Form.Item>

        <Divider />

        <Form.Item
          rules={[
            { required: true, message: "Please upload at least one image" },
          ]}
          name={"images"}
          label={<Title level={5}>Images</Title>}
        >
          <ImageInput
            value={image_urls}
            image_urls={image_urls}
            setImage_urls={setImage_urls}
          />
        </Form.Item>

        <Flex gap={12} justify="flex-end">
          <Form.Item>
            <Button htmlType="submit">Cancel</Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </div>
  );
};

export default AddProduct;

const ProductDescriptionInput = ({ value, onChange }) => {
  const handleChange = (value) => {
    onChange(value);
  };

  return (
    <ReactQuill
      value={value}
      onChange={handleChange}
      placeholder="Enter product description"
      className="custom-quill"
    />
  );
};

const PriceInput = ({ value = {}, onChange }) => {
  const [price, setPrice] = useState(0);
  const [currency, setCurrency] = useState("USD");

  const triggerChange = (changedValue) => {
    onChange?.({
      price,
      currency,
      ...value,
      ...changedValue,
    });
  };

  const onPriceChange = (e) => {
    const newPrice = parseFloat(e.target.value || 0);
    if (Number.isNaN(newPrice)) {
      return;
    }
    if (!("price" in value)) {
      setPrice(newPrice);
    }
    triggerChange({
      price: newPrice,
    });
  };

  const onCurrencyChange = (newCurrency) => {
    if (!("currency" in value)) {
      setCurrency(newCurrency);
    }
    triggerChange({
      currency: newCurrency,
    });
  };

  return (
    <span>
      <Input
        type="number"
        value={value.price || price}
        onChange={onPriceChange}
        style={{ width: 120 }}
        className="input-md"
      />
      <Select
        value={value.currency || currency}
        style={{ width: 100, margin: "0 8px" }}
        onChange={onCurrencyChange}
      >
        <Option value="USD">USD</Option>
        <Option value="EUR">EUR</Option>
        <Option value="RON">RON</Option>
        <Option value="PKR">PKR</Option>
      </Select>
    </span>
  );
};

const ImageInput = ({ image_urls, setImage_urls }) => {
  // const [image_urls, setImage_urls] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImagesNames, setSelectedImagesNames] = useState([]);
  const [loading, setLoading] = useState(false);

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return false;
    }
    setSelectedImages((prevImages) => [...prevImages, file]);
    setSelectedImagesNames((prevNames) => [
      ...prevNames,
      file.name.substring(0, file.name.lastIndexOf(".")),
    ]);
    return false;
  };

  const handleUpload = async () => {
    setLoading(true);
    if (selectedImages.length === 0) {
      message.error("No image selected");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    for (const image of selectedImages) {
      formData.append("images", image);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/images",
        formData
      );
      const data = response.data;
      if (data.success) {
        setLoading(false);
        message.success("Images uploaded successfully");
        setImage_urls([...image_urls, ...data.image_urls]);
        setSelectedImages([]);
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      message.error("Error uploading images");
    }
  };

  const props = {
    multiple: true,
    beforeUpload: beforeUpload,
    onChange: handleUpload,
    showUploadList: false,
    accept: "image/*",
    customRequest: handleUpload,
    fileList: image_urls,
    maxCount: 7,
    value: selectedImages,
  };

  return (
    <>
      <Flex vertical gap={30}>
        <Table
          dataSource={image_urls.map((url, index) => ({
            key: url,
            url,
            name: selectedImagesNames[index],
          }))}
          pagination={false}
          columns={[
            {
              title: "Image",
              dataIndex: "url",
              render: (url) => (
                <Image src={url} alt="avatar" width={50} height={50} />
              ),
            },
            {
              title: "File name",
              dataIndex: "name",
              render: (name) => {
                return name;
              },
            },
            {
              title: "Action",
              dataIndex: "url",
              render: (url, record) => (
                <Button
                  type="warning"
                  icon={<DeleteOutlined />}
                  onClick={() => {
                    console.log(record);
                    setImage_urls(image_urls.filter((u) => u !== url));
                    setSelectedImagesNames(
                      selectedImagesNames.filter((n) => n !== record.name)
                    );
                  }}
                />
              ),
            },
          ]}
        />

        <Dragger
          {...props}
          onChange={(e) => {
            console.log(e);
          }}
          style={{ border: "2px dashed rgba(0,0,0,0.1)", opacity: 1 }}
        >
          <>
            {loading ? (
              <Flex
                gap={4}
                align="center"
                justify="center"
                style={{ height: 200 }}
              >
                <LoadingOutlined style={{ fontSize: 64 }} />
              </Flex>
            ) : (
              <Flex
                gap={4}
                align="center"
                justify="center"
                style={{ height: 200 }}
              >
                <p className="ant-upload-drag-icon">
                  <Avatar size={64}>
                    <CloudUploadOutlined style={{ fontSize: 32 }} />
                  </Avatar>
                </p>
                <Flex vertical gap={4}>
                  <p className="ant-upload-text">
                    Click or upload or drag and drop
                  </p>
                  <p className="ant-upload-hint">
                    (SVG, JPG, PNG, or gif maximum 900x400)
                  </p>
                </Flex>
              </Flex>
            )}
          </>
        </Dragger>
      </Flex>
    </>
  );
};
