import "mocha";
import { expect } from "chai";

import {
  navigatePathToValue,
  navigatePathToObject
} from "../../../server/api/services/ranking.service";

const parking = [
  {
    id: "urn:ngsi-ld:OffStreetParking:Downtown1",
    type: "OffStreetParking",
    name: {
      type: "Property",
      value: "Downtown One"
    },
    availableSpotNumber: {
      type: "Property",
      value: 121,
      observedAt: "2017-07-29T12:05:02Z",
      reliability: {
        type: "Property",
        value: 0.7
      },
      providedBy: {
        type: "Relationship",
        object: "urn:ngsi-ld:Camera:C1"
      }
    },
    totalSpotNumber: {
      type: "Property",
      value: 200
    },
    location: {
      type: "GeoProperty",
      value: {
        type: "Point",
        coordinates: [-8.5, 41.2]
      }
    },
    "@context": [
      "http://example.org/ngsi-ld/latest/parking.jsonld",
      "https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld"
    ]
  },
  {
    id: "urn:ngsi-ld:OffStreetParking:Downtown2",
    type: "OffStreetParking",
    name: {
      type: "Property",
      value: "Downtown One"
    },
    location: {
      type: "GeoProperty",
      value: {
        type: "Point",
        coordinates: [-8.5, 41.2]
      }
    },
    "@context": [
      "http://example.org/ngsi-ld/latest/parking.jsonld",
      "https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld"
    ]
  },
  {
    id: "urn:ngsi-ld:OffStreetParking:Downtown3",
    type: "OffStreetParking",
    name: {
      type: "Property",
      value: "Downtown One"
    },
    availableSpotNumber: {
      type: "Property",
      value: 121,
      observedAt: "2017-07-29T12:05:02Z",
      reliability: {
        type: "Property",
        value: 0.7
      },
      providedBy: {
        type: "Relationship",
        object: "urn:ngsi-ld:Camera:C1"
      }
    },
    totalSpotNumber: {
      type: "Property",
      value: 200
    },
    location: {
      type: "GeoProperty",
      value: {
        type: "Point",
        coordinates: [-8.5, 41.2]
      }
    },
    "@context": [
      "http://example.org/ngsi-ld/latest/parking.jsonld",
      "https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld"
    ]
  }
];

describe("navigatePathToObject", () => {
  it("matches path", () => {
    const result = navigatePathToObject(
      parking,
      "availableSpotNumber.providedBy"
    );
    expect(result)
      .to.be.an("array")
      .of.length(2);
  });
});
