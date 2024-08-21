import { Col, Divider, Flex, Row } from "antd";

/* eslint-disable react/prop-types */
const CountryInfo = (props) => {
  const { info } = props;

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Flex justify="center" align="center">
          <h1>{info.name.official}</h1>
        </Flex>
      </Col>
      <Col xs={24}>
        <Flex justify="center" align="center">
          <img src={info.flags.png} height={100} />
        </Flex>
        <Flex justify="center" align="center" style={{ marginTop: 15 }}>
          <span>
            {info.maps ? (
              <a href={info.maps.googleMaps} target="/">
                Google map
              </a>
            ) : (
              "N/a"
            )}
          </span>
        </Flex>
        <Divider />
      </Col>
      <Col xs={24} lg={12}>
        <Row gutter={[8, 8]}>
          <Col xs={6}>
            <span>Region</span>
          </Col>
          <Col>:</Col>
          <Col xs={17}>
            <span>{info.region ? info.region : "N/a"}</span>
          </Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col xs={6}>
            <span>Continents</span>
          </Col>
          <Col>:</Col>
          <Col xs={17}>
            <span>{info.continents ? info.continents : "N/a"}</span>
          </Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col xs={6}>
            <span>Sub region</span>
          </Col>
          <Col>:</Col>
          <Col xs={17}>
            <span>{info.subregion ? info.subregion : "N/a"}</span>
          </Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col xs={6}>
            <span>Sub region</span>
          </Col>
          <Col>:</Col>
          <Col xs={17}>
            <span>
              {info.languages
                ? info.languages[Object.keys(info.languages)[0]]
                : "N/a"}
            </span>
          </Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col xs={6}>
            <span>Border</span>
          </Col>
          <Col>:</Col>
          <Col xs={17}>
            {info?.borders?.length > 0 ? info.borders.toString() : "N/a"}
          </Col>
        </Row>
      </Col>
      <Col xs={24} lg={12}>
        <Row gutter={[8, 8]}>
          <Col xs={6}>
            <span>Area</span>
          </Col>
          <Col>:</Col>
          <Col xs={17}>
            {info.area ? (
              <span>
                {info.area}
                <span>&#13221;</span>
              </span>
            ) : (
              "N/a"
            )}
          </Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col xs={6}>
            <span>Population</span>
          </Col>
          <Col>:</Col>
          <Col xs={17}>
            {info.population ? <span>{info.population}</span> : "N/a"}
          </Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col xs={6}>
            <span>Time Zone</span>
          </Col>
          <Col>:</Col>
          <Col xs={17}>
            <span>
              {info.timezones
                ? info?.timezones?.length > 0
                  ? info.timezones.toString()
                  : "N/a"
                : "N/a"}
            </span>
          </Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col xs={6}>
            <span>Detail </span>
          </Col>
          <Col>:</Col>
          <Col xs={17}>
            <span>
              {info.maps ? (
                <a href={info.maps.openStreetMaps} target="/">
                  More information...
                </a>
              ) : (
                "N/a"
              )}
            </span>
          </Col>
        </Row>
      </Col>
      <Col span={24}></Col>
    </Row>
  );
};

export default CountryInfo;
