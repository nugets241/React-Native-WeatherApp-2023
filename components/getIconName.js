export function getIconName(icon, description) {
  switch (true) {
    case description.includes('sleet') && icon.includes('13'):
      icon = `${icon}Sleet`;
      break;
    case description.includes('shower') && icon.includes('13'):
      icon = `${icon}Shower`;
      break;
    case description.includes('rain') && icon.includes('13'):
      icon = `${icon}Rain`;
      break;
    case description.includes('tornado'):
      icon = 'tornado';
      break;
    case description.includes('with') && icon.includes('11'):
      icon = `${icon}Rain`;
      break;
  }
  return icon;
}
