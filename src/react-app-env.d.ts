/// <reference types="react-scripts" />

declare module "*.json" { const value: any;
                          export default value;
}
declare module "json!*" { const value: any;
                          export default value;
}
