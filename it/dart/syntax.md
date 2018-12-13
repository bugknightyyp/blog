# dart 基本语法

## 可选参数

dart中支持命名可选参数和位置可选参数，但是不能同时混用

- 命名可选参数使用大括号{}，默认值用冒号:
- 位置可选参数使用方括号[]，默认值用等号=

## 函数别名

可以使用typedef来定义函数，这样可以使用这个名字来关联该函数。

```dart
typedef int Compare(int a, int b);
int sort(int a, int b) => a - b;

main() {
  assert(sort is Function);
  assert(sort is Compare);
}
```