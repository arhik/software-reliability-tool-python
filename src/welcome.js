export class Welcome {
  heading = 'Welcome to the Software Reliability Tool';
}

export class UpperValueConverter {
  toView(value) {
    return value && value.toUpperCase();
  }
}
