import { useEffect, useState } from "react";
import { BECardType } from "../../../models/credit-card.types";

const url =
  "https://sumup-op-hiring-test.s3.eu-west-1.amazonaws.com/api-mock/cards-dictionary.json";

type BEResponse = {
  type: string;
  data: Array<BECardType>;
};

export const useCardType = () => {
  const [ccTypes, setCcTypes] = useState<Array<BECardType>>([]);

  useEffect(() => {
    if (!ccTypes.length) {
      fetch(url)
        .then((resp: Response) => {
          if (resp.status >= 200 && resp.status < 300) {
            return resp.json();
          }
          throw new Error("failed request");
        })
        .then((finalResponse: BEResponse) => {
          if (!finalResponse.data) {
            throw new Error("invalid response");
          }
          setCcTypes(finalResponse.data);
        })
        .catch(() => {
          console.log("request failed");
        });
    }
  }, [ccTypes.length]);

  return ccTypes;
};
