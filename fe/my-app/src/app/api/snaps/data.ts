declare global {
    var snaps: any[];
  }
  
  export const snaps =
    global.snaps || (global.snaps = []);