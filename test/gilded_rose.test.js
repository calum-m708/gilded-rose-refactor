const { Shop, Item } = require('../src/gilded_rose');

describe('Gilded Rose', () => {
  it('should lower both the SellIn and Quality at the end of each day', () => {
    // Given: that I have a Shop with an Item of SellIn 2, Quality 5
    const gildedRose = new Shop([new Item('foo', 2, 5)]);

    // When: the update occurs at the end of the day
    const items = gildedRose.updateQuality();

    // Then: I expect both values to have been lowered by 1
    expect(items[0]).toMatchObject(new Item('foo', 1, 4));
  });

  it('should lower the Quality twice as fast once the Sell By date has passed', () => {
    // Given: that I have a Shop with an Item of SellIn 0, Quality 5
    const gildedRose = new Shop([new Item('foo', 0, 5)]);

    // When: the update occurs at the end of the day
    const items = gildedRose.updateQuality();

    // Then: I expect the SellIn to reduce by 1, and the Quality to reduce by 2
    expect(items[0]).toMatchObject(new Item('foo', -1, 3));
  });

  it('should not reduce Quality past 0', () => {
    // Given: that I have a Shop with an Item of SellIn 0, Quality 1
    const gildedRose = new Shop([new Item('foo', 0, 1)]);

    // When: the update occurs at the end of the day
    const items = gildedRose.updateQuality();

    // Then: I expect the SellIn to reduce by 1, and the Quality to be limited at 0
    expect(items[0]).toMatchObject(new Item('foo', -1, 0));
  });
  it('should raise the Quality of Aged Brie as it ages', () => {
    // Given: that I have a Shop with an Item 'Aged Brie' of SellIn 5, Quality 5
    const gildedRose = new Shop([new Item('Aged Brie', 5, 5)]);

    // When: the update occurs at the end of the day
    const items = gildedRose.updateQuality();

    // Then: I expect the SellIn to reduce by 1, and the Quality to increase by 1
    expect(items[0]).toMatchObject(new Item('Aged Brie', 4, 6));
  });
  it('should never raise the Quality past 50', () => {
    // Given: that I have a Shop with an Item of SellIn 0, Quality 5
    const gildedRose = new Shop([new Item('Aged Brie', 5, 50)]);

    // When: the update occurs at the end of the day
    const items = gildedRose.updateQuality();

    // Then: I expect the SellIn to reduce by 1, and the Quality to remain at 50
    expect(items[0]).toMatchObject(new Item('Aged Brie', 4, 50));
  });

  it('The Quality and SellIn of Sulfuras should never reduce', () => {
    // Given: that I have a Shop with an Item 'Sulfuras, Hand of Ragnaros' of SellIn 5, Quality 5
    const gildedRose = new Shop([new Item('Sulfuras, Hand of Ragnaros', 5, 5)]);

    // When: the update occurs at the end of the day
    const items = gildedRose.updateQuality();

    // Then: I expect the SellIn and Quality to remain the same
    expect(items[0]).toMatchObject(
      new Item('Sulfuras, Hand of Ragnaros', 5, 5)
    );
  });

  describe('Backstage Passes', () => {
    it('The Quality of Backstage Passes should increase', () => {
      // Given: that I have a Shop with an item 'Backstage passes to a TAKFAL80ETC concert' of SellIn 20, Quality 5
      const gildedRose = new Shop([
        new Item('Backstage passes to a TAFKAL80ETC concert', 20, 5)
      ]);

      // When: the update occurs at the end of the day
      const items = gildedRose.updateQuality();

      // Then: I expect the SellIn to reduce by 1 and the Quality to increase by 1
      expect(items[0]).toMatchObject(
        new Item('Backstage passes to a TAFKAL80ETC concert', 19, 6)
      );
    });
    it('The Quality of Backstage Passes should increase by 2, if the SellIn is 10 or less', () => {
      // Given: that I have a Shop with an item 'Backstage passes to a TAKFAL80ETC concert' of SellIn 10, Quality 5
      const gildedRose = new Shop([
        new Item('Backstage passes to a TAFKAL80ETC concert', 10, 5)
      ]);

      // When: the update occurs at the end of the day
      const items = gildedRose.updateQuality();

      // Then: I expect the SellIn to reduce by 1 and the Quality to increase by 2
      expect(items[0]).toMatchObject(
        new Item('Backstage passes to a TAFKAL80ETC concert', 9, 7)
      );
    });
    it('The Quality of Backstage Passes should increase by 3, if the SellIn is 5 or less', () => {
      // Given: that I have a Shop with an item 'Backstage passes to a TAKFAL80ETC concert' of SellIn 5, Quality 5
      const gildedRose = new Shop([
        new Item('Backstage passes to a TAFKAL80ETC concert', 5, 5)
      ]);

      // When: the update occurs at the end of the day
      const items = gildedRose.updateQuality();

      // Then: I expect the SellIn to reduce by 1 and the Quality to increase by 3
      expect(items[0]).toMatchObject(
        new Item('Backstage passes to a TAFKAL80ETC concert', 4, 8)
      );
    });
    it('The Quality of Backstage Passes should decrease to 0, if the SellIn is less than 0', () => {
      // Given: that I have a Shop with an item 'Backstage passes to a TAKFAL80ETC concert' of SellIn 0, Quality 5
      const gildedRose = new Shop([
        new Item('Backstage passes to a TAFKAL80ETC concert', 0, 5)
      ]);

      // When: the update occurs at the end of the day
      const items = gildedRose.updateQuality();

      // Then: I expect the SellIn to reduce by 1 and the Quality to reduce to 0
      expect(items[0]).toMatchObject(
        new Item('Backstage passes to a TAFKAL80ETC concert', -1, 0)
      );
    });
  });

  it('Conjured Items should degrade in quality twice as fast', () => {
    // Given: that I have a Shop with an Item 'Conjured Greatsword of Rending' of SellIn 5, Quality 5
    const gildedRose = new Shop([
      new Item('Conjured Greatsword of Rending', 5, 5)
    ]);
    // When: the update occurs at the end of the day
    const items = gildedRose.updateQuality();
    // Then: I expect the SellIn to reduce by 1, and and the Quality to reduce by 2
    expect(items[0]).toMatchObject(
      new Item('Conjured Greatsword of Rending', 4, 3)
    );
  });
});
