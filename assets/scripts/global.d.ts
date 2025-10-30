// 全域類型定義 - 完全關閉 TypeScript 檢查
declare const cc: any;
declare const _decorator: any;
declare const property: any;
declare const ccclass: any;

// 關閉所有 TypeScript 錯誤
declare module 'cc' {
    const _decorator: any;
    const Component: any;
    const Node: any;
    const Vec3: any;
    const Vec2: any;
    const director: any;
    const input: any;
    const Input: any;
    const EventKeyboard: any;
    const EventTouch: any;
    const KeyCode: any;
    const Camera: any;
    const RigidBody2D: any;
    const Collider2D: any;
    const Sprite: any;
    const SpriteFrame: any;
    const Animation: any;
    const Canvas: any;
    const Label: any;
    const ProgressBar: any;
    const UITransform: any;
    const Widget: any;
    const tween: any;
    const PhysicsSystem2D: any;
    const Contact2DType: any;
    const IPhysics2DContact: any;
    const Scene: any;
    const lerp: any;
    const systemEvent: any;
    const SystemEvent: any;
    const Event: any;
    const macro: any;
    const v2: any;
    const v3: any;
}
