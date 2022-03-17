import { BECardType } from "../../models/credit-card.types";

export const findCardRange = (creditCardTypes: Array<BECardType>, creditCardInput: string) =>
  creditCardTypes.find((el: BECardType) =>
    el.ranges.split(",").some((range: string) => {
      const trimmedRange = range.trim();
      if (trimmedRange.includes("-")) {
        const [lowRange, hiRange] = trimmedRange.split("-");
        const cardCuttedValue: number = +creditCardInput.substring(
          0,
          Math.max(hiRange.length, lowRange.length)
        );

        return cardCuttedValue >= +lowRange && cardCuttedValue <= +hiRange;
      } else {
        return trimmedRange === creditCardInput.substring(0, trimmedRange.length);
      }
    })
  );