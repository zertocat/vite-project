import { useEffect, useState } from "react";

//
// components
//
import { Card, Breadcrumb, Table, Row, Col, Input, Modal } from "antd";
// icons
import { FlagOutlined } from "@ant-design/icons";
//
import CountryCatalog from "../../services/country-catalog";
import CountryInfo from "./country-info";
//
//
//
// change the component name here and export default at the below too
const CountriesCatalog = () => {
  //
  const [loading, setLoading] = useState(false);
  const [dataTable, setDataTable] = useState([]);
  //
  const [tempData, setTempData] = useState([]);
  const [search, setSearch] = useState("");
  const [totalRow, setTotalRow] = useState(0);
  //
  const [isOpen, setIsOpen] = useState(false);
  const [info, setInfo] = useState({});
  //
  const columns = [
    {
      title: "No",
      align: "center",
      width: "3%",
      render: (t, r, i) => i + 1,
    },
    {
      title: "Flags",
      dataIndex: "flags",
      align: "center",
      render: (text) => <img src={text?.png} alt={text?.alt} width={50} />,
    },
    {
      title: "Country Name",
      dataIndex: "name",
      render: (text, r) => (
        <span
          onClick={() => {
            onHandleInfo(r);
          }}
          style={{ cursor: "pointer" }}
        >
          {text?.official}
        </span>
      ),
      sorter: (a, b) => a?.name?.official?.length - b?.name?.official?.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "2 character Country Code",
      dataIndex: "cca2",
    },
    {
      title: "3 character Country Code",
      dataIndex: "cca3",
    },
    {
      title: "Native Country Name",
      dataIndex: "name",
      render: (text) => (
        <span>
          {text.nativeName
            ? text?.nativeName[Object.keys(text.nativeName)[0]]?.official
            : "N/a"}
        </span>
      ),
    },
    {
      title: "Alternative Country Name",
      dataIndex: "altSpellings",
    },
    {
      title: "Country Calling Codes",
      dataIndex: "idd",
      render: (text) => {
        return text.root ? (
          <div>
            <span>{text?.root + text?.suffixes.toString()}</span>
          </div>
        ) : (
          "N/a"
        );
      },
    },
  ];
  //
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 25,
      pageSizeOptions: [10, 25, 50, 100, 150],
      //   showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
    },
  });
  //
  const handleChangeTable = (pagination) => {
    setTableParams({
      pagination,
    });
  };
  //
  const getCountryLists = () => {
    setLoading(true);
    CountryCatalog.getCountryLists()
      .then((res) => {
        setDataTable(res);
        setTempData(res);
        setTotalRow(res.length);
        setTableParams({
          pagination: {
            ...tableParams.pagination,
            total: res.length,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  //
  const onHandleInfo = (val) => {
    setIsOpen(true);
    setInfo(val);
  };
  //
  const handleCancel = () => {
    setIsOpen(false);
  };
  //
  useEffect(() => {
    getCountryLists();
  }, []);

  useEffect(() => {
    if (!search) {
      setDataTable(tempData);
      setTableParams({
        pagination: {
          ...tableParams.pagination,
          total: totalRow,
        },
      });
      return;
    }

    const items = tempData;
    const temp = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.name.official.toLowerCase().includes(search.toLowerCase())) {
        temp.push(item);
      }
    }
    // console.log(temp);
    setTableParams({
      pagination: {
        ...tableParams.pagination,
        total: 1,
      },
    });

    setDataTable([...temp]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
  //
  return (
    <div>
      <Breadcrumb
        style={{
          position: "fixed",
          top: "15px",
          right: "16px",
        }}
        items={[
          {
            title: <FlagOutlined />,
          },
          {
            title: "Countries Catalog",
          },
        ]}
      />
      {/* card */}
      <Card
        title={
          <h3>
            <FlagOutlined /> Countries Catalog
          </h3>
        }
        style={{ marginTop: "50px" }}
      >
        {/* code here */}
        <Row style={{ marginBottom: "15px" }}>
          <Col xs={4} sm={12} md={18}></Col>
          <Col xs={20} sm={12} md={6}>
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
        </Row>
        <Table
          size="small"
          bordered
          loading={loading}
          dataSource={dataTable}
          rowKey={(record) => record.name.official}
          columns={columns}
          scroll={{ x: "50vw" }}
          onChange={handleChangeTable}
          pagination={tableParams.pagination}
        />
      </Card>
      <Modal
        title={"Country Info"}
        open={isOpen}
        footer={null}
        // confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <CountryInfo {...{ info }} />
      </Modal>
    </div>
  );
};
// change the component name here too
export default CountriesCatalog;
