/**
 * 数字枚举
 */
enum Color {
  Red,
  Green,
  Blue,
}

let col = Color.Red;
col = 0;
console.log('col=>', col);

enum Color {
  DarkRed = 3, // 枚举的延续块中第一个值必须初始化，以避免破坏前面已经定义的值
  DarkGreen,
  DarkBlue,
}

enum AnimalFlags {
  None = 0,
  HasClaws = 1 << 0,
  CanFly = 1 << 1,
  EatsFish = 1 << 2,
  Endangered = 1 << 3,
}

console.log('Animal:', AnimalFlags['CanFly']); // 2

interface Animal {
  flags: AnimalFlags;
  [key: string]: any;
}

function printAnimalAbilities(animal: Animal) {
  let animalFlags = animal.flags;
  if (animalFlags & AnimalFlags.HasClaws) {
    console.log('animal has claw');
  }
  if (animalFlags & AnimalFlags.CanFly) {
    console.log('animal can fly');
  }
  if (animalFlags == AnimalFlags.None) {
    console.log('nothing');
  }
}
/**
 * 使用 |= 来添加一个标志；
 * 组合使用 &= 和 ~ 来清理一个标志；
 * | 来合并标志。
 */
var animal = { flags: AnimalFlags.None };
printAnimalAbilities(animal); // nothing

animal.flags |= AnimalFlags.HasClaws;
printAnimalAbilities(animal); // animal has claw

animal.flags &= ~AnimalFlags.HasClaws;
printAnimalAbilities(animal); // nothing

animal.flags |= AnimalFlags.HasClaws |= AnimalFlags.CanFly;
printAnimalAbilities(animal); // animal has claw, animal has fly

/**
 * 字符串枚举
 */
export enum SocialMediaEnum {
  UNKNOW = '',
  QQ = 'qq',
  WECHAT = 'wechat',
  WEIBO = 'weibo',
}

/**
 * 带静态方法的枚举
 */
enum Weekday {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

// 通过 namespace 向枚举添加静态方法
namespace Weekday {
  export function isBusinessDay(day: Weekday) {
    switch (day) {
      case Weekday.Saturday:
      case Weekday.Sunday:
        return true;
      default:
        return false;
    }
  }
}

console.log('monday is weekday:', Weekday.isBusinessDay(Weekday.Monday)); // false
console.log('sunday is weekday:', Weekday.isBusinessDay(Weekday.Sunday)); // true

enum Color {
  Red = 1,
  Green,
  Blue,
}

enum Color {
  DarkRed,
  DarkGreen,
  DarkBlue,
}
console.log('log=>', Color.DarkRed);
