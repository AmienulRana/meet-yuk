export function getRandomBrightColor() {
    const brightColors = ["#FF69B4", "#00FF00", "#FFFF00", "#0000FF", "#800080", "#FFA500", "#FFC0CB", "#FFD700"];
  
    const randomIndex = Math.floor(Math.random() * brightColors.length);
    return brightColors[randomIndex];
  }