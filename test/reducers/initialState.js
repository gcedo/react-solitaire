import Immutable from 'immutable';

export default
{
  game: Immutable.fromJS({
      FOUNDATION:{
        HEARTS:[],
        SPADES:[],
        DIAMONDS:[],
        CLUBS:[]
      },
      PILE:[
        [
          { rank:'10', suit:'SPADES', upturned:true }
        ],
        [
          { rank:'6', suit:'DIAMONDS' },
          { rank:'K', suit:'DIAMONDS', upturned:true }
        ],
        [
          { rank:'9', suit:'DIAMONDS' },
          { rank:'K', suit:'CLUBS' },
          { rank:'A', suit:'DIAMONDS', upturned:true }
        ],
        [
          { rank:'5', suit:'SPADES' },
          { rank:'J', suit:'DIAMONDS' },
          { rank:'7', suit:'HEARTS' },
          { rank:'2', suit:'SPADES', upturned:true }
        ],
        [
          { rank:'A', suit:'SPADES' },
          { rank:'5', suit:'CLUBS' },
          { rank:'3', suit:'CLUBS' },
          { rank:'10', suit:'CLUBS' },
          { rank:'8', suit:'CLUBS', upturned:true }
        ],
        [
          { rank:'9', suit:'HEARTS' },
          { rank:'4', suit:'SPADES' },
          { rank:'9', suit:'SPADES' },
          { rank:'9', suit:'CLUBS' },
          { rank:'7', suit:'CLUBS' },
          { rank:'3', suit:'DIAMONDS', upturned:true }
        ]
      ],
      DECK:{
        upturned:[
          { rank:'2', suit:'CLUBS' }
        ],
        downturned:[
          { rank:'Q', suit:'CLUBS' },
          { rank:'5', suit:'DIAMONDS' },
          { rank:'7', suit:'DIAMONDS' },
          { rank:'8', suit:'SPADES' },
          { rank:'6', suit:'SPADES' },
          { rank:'6', suit:'CLUBS' },
          { rank:'4', suit:'HEARTS' },
          { rank:'3', suit:'HEARTS' },
          { rank:'4', suit:'DIAMONDS' },
          { rank:'Q', suit:'SPADES' },
          { rank:'4', suit:'CLUBS' },
          { rank:'J', suit:'SPADES' },
          { rank:'8', suit:'DIAMONDS' },
          { rank:'J', suit:'CLUBS' },
          { rank:'2', suit:'DIAMONDS' },
          { rank:'10', suit:'HEARTS' },
          { rank:'A', suit:'CLUBS' },
          { rank:'8', suit:'HEARTS' },
          { rank:'6', suit:'HEARTS' },
          { rank:'7', suit:'SPADES' },
          { rank:'K', suit:'SPADES' },
          { rank:'5', suit:'HEARTS' },
          { rank:'Q', suit:'DIAMONDS' },
          { rank:'3', suit:'SPADES' },
          { rank:'Q', suit:'HEARTS' },
          { rank:'A', suit:'HEARTS' },
          { rank:'2', suit:'HEARTS' },
          { rank:'K', suit:'HEARTS' },
          { rank:'10', suit:'DIAMONDS' },
          { rank:'J', suit:'HEARTS' }
        ]
      }
    })
}
