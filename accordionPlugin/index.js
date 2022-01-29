class Accordion {
  
  constructor(options) {
    this.$accordions = options.page.querySelectorAll('[data-accordion]')
    this.childrenClasses = ['accordion__title', 'accordion__button', 'accordion__content']
    
    this.clickableHeader = options.clickableHeader ?? false 
    this.buttonVisible = options.buttonVisible ?? true 
    this.animation = options.animation ?? true
    this.customIcon = options.customIcon
    
    this.buttonVisible ? '' : this.childrenClasses[1] = 'accordion__button-hide'
    
    this.setStyles()
    this.setHTML()
    this.setEventListeners()
  }
  
  setStyles() {
    this.$accordions.forEach(accordion => { 
      accordion.classList.add('accordion') 
      
      for (let index = 0; index < accordion.children.length; index++) { 
        accordion.children[index].classList.add(this.childrenClasses[index])
        
        if (this.customIcon) {
          accordion.children[1].classList.add('custom-icon')
        }
      }
      
      if (!this.animation) {
          accordion.classList.add('no-animation')
      }
      
    })
    
  }
  
  setHTML() {
    this.$accordions.forEach(accordion => {
      const html = `
        <div class="accordion__header">
          ${accordion.querySelector('.accordion__title').outerHTML}
          ${
            this.buttonVisible ? accordion.querySelector('.accordion__button').outerHTML : ''
          }
        </div>
        <div class="accordion__body">
          ${accordion.querySelector('.accordion__content').outerHTML}
        </div>
      `
      
      accordion.innerHTML = html
    })
  }
  
  setEventListeners() {
    this.$accordions.forEach(accordion => {
      const button = accordion.querySelector('.accordion__button')
        
      if (this.buttonVisible != false) {
        button.addEventListener('click', this.openAccordion)
      }
      
      if (this.clickableHeader) {
        const header = accordion.querySelector('.accordion__header')
        
        header.addEventListener('click', this.openAccordion)
        header.classList.add('clickable')
      }
    })
  }

  openAccordion(event) {
    const 
      accordion           = event.target.closest('.accordion'),
      accordionBody       = accordion.querySelector('.accordion__body'),
      accordionBodyHeight = accordionBody.querySelector('.accordion__content').offsetHeight
    
    accordion.classList.toggle('open')
    
    if (accordionBody.style.height != '') {
        accordionBody.style.height = ''
      
        return
    }
    
    accordionBody.style.height = `${Number(accordionBodyHeight) + 32}px`
    
  }
  
}