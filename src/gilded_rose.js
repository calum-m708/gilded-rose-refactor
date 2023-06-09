class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class GenericItem extends Item {
  reduceSellIn() {
    this.sellIn -= 1;
  }
  updateQuality() {
    this.quality = Math.max(
      this.sellIn > 0 ? this.quality - 1 : this.quality - 2,
      0
    );
  }
  updateItem() {
    this.reduceSellIn();
    this.updateQuality();
  }
}

class MaturingItem extends GenericItem {
  updateQuality() {
    this.quality = Math.min(this.quality + 1, 50);
  }
}

class LegendaryItem extends GenericItem {
  updateQuality() {
    this.quality = this.quality;
  }
}

class BackstagePass extends GenericItem {
  updateQuality() {
    if (this.sellIn < 0) {
      this.quality = 0;
    } else if (this.sellIn <= 5) {
      this.quality = this.quality + 3;
    } else if (this.sellIn <= 10) {
      this.quality = this.quality + 2;
    } else {
      this.quality = this.quality + 1;
    }
  }
}

class ConjuredItem extends GenericItem {
  updateQuality() {
    this.quality = Math.max(
      this.sellIn > 0 ? this.quality - 2 : this.quality - 4,
      0
    );
  }
}
class Shop {
  constructor(items = []) {
    this.items = items.map((item) => {
      switch (item.name) {
        case 'Conjured Greatsword of Rending':
          return new ConjuredItem(item.name, item.sellIn, item.quality);
        case 'Backstage passes to a TAFKAL80ETC concert':
          return new BackstagePass(item.name, item.sellIn, item.quality);
        case 'Sulfuras, Hand of Ragnaros':
          return new LegendaryItem(item.name, item.sellIn, item.quality);
        case 'Aged Brie':
          return new MaturingItem(item.name, item.sellIn, item.quality);
        default:
          return new GenericItem(item.name, item.sellIn, item.quality);
      }
    });
  }

  updateQuality() {
    this.items.forEach((item) => item.updateItem());
    return this.items;
  }
}

module.exports = {
  Item,
  Shop
};
