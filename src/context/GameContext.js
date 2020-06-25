import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import { navigate } from '../navigationRef';

var counter       = 0;
var queensPlaced  = [];
var chessboard    = [];
var noThreatens   = [];
var end           = false;
var victory       = false;
var allThreatened = false;

const gameReducer = (state,action) => {
  switch (action.type){
    case 'set_up_game':
      return {
              ...state,
              queens              : action.payload.queensNo,
              chessboardSize      : action.payload.chessboardSize,
              hasqueen            : action.payload.hasqueenInit,
              end                 : action.payload.end,
              noThreatensSquares  : action.payload.noThreatens,
              continueGame        : action.payload.continueGame,
              queensPlaced        : action.payload.queensPlaced,
              victory             : action.payload.victory,
              allThreatened       : action.payload.allThreatened
            }
    case 'new_game':
      return {
              ...state,
              hasqueen            : action.payload.hasqueenInit,
              end                 : action.payload.end,
              noThreatensSquares  : action.payload.noThreatens,
              continueGame        : action.payload.continueGame,
              queensPlaced        : action.payload.queensPlaced,
              victory             : action.payload.victory,
              allThreatened       : action.payload.allThreatened
            }
    case 'placed_all_queens':
      return {
              ...state,
              end                 : action.payload.end,
              noThreatensSquares  : action.payload.noThreatens,
              continueGame        : action.payload.continueGame,
              victory             : action.payload.victory,
              allThreatened       : action.payload.allThreatened
            }
    default:
      return state;
  }
};

const setUpGame = (dispatch) => {
  return async ({chessboardSize,queensNo}) => {
    queensPlaced = [];
    for(let i=0;i< parseInt(chessboardSize);i++)
    {
      queensPlaced.push(-parseInt(queensNo));
    }

    counter=0;
    var hasqueenInit=false;
    end = false;
    noThreatens = [];
    var continueGame = false;
    victory = false;
    allThreatened = false;
    await AsyncStorage.clear();
    await AsyncStorage.setItem('queensNo', queensNo.toString());
    await AsyncStorage.setItem('chessboardSize', chessboardSize.toString());
    await AsyncStorage.setItem('queensPlaced', queensPlaced.toString());
    await AsyncStorage.setItem('counter', counter.toString());


    dispatch({
              type: 'set_up_game',
              payload:{
                        chessboardSize,
                        queensNo,
                        hasqueenInit,
                        end,
                        noThreatens,
                        continueGame,
                        queensPlaced,
                        victory,
                        allThreatened
                      }
    });
    navigate('Game');
  };

};

const newGame = (dispatch) => {
  return async ({chessboardSize,queensNo}, callback) => {
    queensPlaced = [];
    for(let i=0;i< parseInt(chessboardSize);i++)
    {
      queensPlaced.push(-parseInt(queensNo));
    }
    counter=0;
    end=false;
    noThreatens = [];
    victory = false;
    allThreatened = false;
    var continueGame = false;
    var hasqueenInit=false;
    await AsyncStorage.clear();
    await AsyncStorage.setItem('queensNo', queensNo.toString());
    await AsyncStorage.setItem('chessboardSize', chessboardSize.toString());
    await AsyncStorage.setItem('queensPlaced', queensPlaced.toString());
    await AsyncStorage.setItem('counter', counter.toString());
    dispatch({ type: 'new_game', payload:{hasqueenInit,end,noThreatens,continueGame,queensPlaced,victory}});
    callback();
  };

};

const continueGame = (dispatch) => {
  return async () => {
    queensPlaced         = [];
    var hasqueenInit     = false;
    noThreatens          = [];
    chessboard           = [];
    counter              = parseInt(await AsyncStorage.getItem('counter'));
    var queensNo         = parseInt(await AsyncStorage.getItem('queensNo'));
    var chessboardSize   = parseInt(await AsyncStorage.getItem('chessboardSize'));
    var tempQueensPlaced = await AsyncStorage.getItem('queensPlaced');
    tempQueensPlaced     = tempQueensPlaced.split(",");
    var continueGame     = true;


    for(let i=0; i < tempQueensPlaced.length; i++)
    {
      queensPlaced.push(parseInt(tempQueensPlaced[i]));
    }

    if( counter == queensNo )
    {
      end = true;
      for(let r=0;r < parseInt(chessboardSize);r++)
      {
        chessboard.push([]);
        for(var co=0;co< parseInt(chessboardSize);co++)
        {
             chessboard[r][co]=0;
        }
      }
      for(let i=0;i < queensPlaced.length;i++)
      {
        if(queensPlaced[i]>=0)
        {
          for(var r=0;r< parseInt(chessboardSize);r++)
          {
            for(var co=0;co< parseInt(chessboardSize);co++)
            {
              if ( co == queensPlaced[i] || co-r == queensPlaced[i]-i || co+r == queensPlaced[i]+i || r == i)
                   chessboard[r][co]=1;
            }
          }
        }
      }
      var hasWon = true;
      for(let r=0;r< parseInt(chessboardSize);r++)
      {

        for(let co=0;co< parseInt(chessboardSize);co++)
        {
          if ( chessboard[r][co]==0)
          {
            noThreatens.push([r,co]);
            hasWon = false;
          }
        }
      }
      if(hasWon)
      {
        victory = true;
      }
      else
      {
          allThreatened = true;
      }
    }

    dispatch({
              type: 'set_up_game',
              payload:{
                        chessboardSize,
                        queensNo,
                        hasqueenInit,
                        end,
                        noThreatens,
                        continueGame,
                        queensPlaced,
                        victory,
                        allThreatened
                      }
    });
    navigate('Game');
  };

};

const placeQueen = (dispatch) => {
  return async (position,hasQueen,chessboardSize,queensNo, callback) => {
    let status        = '';
    var rowToPut      = position[1];
    var colToPut      = position[0];
    var validPosition = true;
    victory           = false;
    allThreatened     = false;

    if(counter < queensNo)
    {
      if(!hasQueen)
      {
        for(let i=0;i < queensPlaced.length;i++)
        {
          if(queensPlaced[i]>=0)
          {
            if ( colToPut == queensPlaced[i] ||
                 colToPut-rowToPut == queensPlaced[i]-i ||
                 colToPut+rowToPut == queensPlaced[i]+i||
                 rowToPut == i)
              {
                validPosition = false;
                break;
              }
          }
        }
        if(validPosition)
        {
          queensPlaced[rowToPut]=colToPut;
          status='put';
          counter++;
        }

      }
      else
      {
        queensPlaced[rowToPut]=-parseInt(queensPlaced.length);
        status='remove';
        counter--;
      }

      if( counter == queensNo )
      {
        end = true;
        for(let r=0;r < parseInt(chessboardSize);r++)
        {
          chessboard.push([]);
          for(var co=0;co< parseInt(chessboardSize);co++)
          {
               chessboard[r][co]=0;
          }
        }
        for(let i=0;i < queensPlaced.length;i++)
        {
          if(queensPlaced[i]>=0)
          {
            for(var r=0;r< parseInt(chessboardSize);r++)
            {
              for(var co=0;co< parseInt(chessboardSize);co++)
              {
                if ( co == queensPlaced[i] || co-r == queensPlaced[i]-i || co+r == queensPlaced[i]+i || r == i)
                     chessboard[r][co]=1;
              }
            }
          }
        }
        var hasWon = true;
        for(let r=0;r< parseInt(chessboardSize);r++)
        {

          for(let co=0;co< parseInt(chessboardSize);co++)
          {
            if ( chessboard[r][co]==0)
            {
              noThreatens.push([r,co]);
              hasWon = false;
            }
          }
        }
        if(hasWon)
        {
          victory = true;
        }
        else
        {
          allThreatened = true;
        }
      }

    }
    else
    {
      if(hasQueen)
      {
        end = false;
        noThreatens       = [];
        queensPlaced[rowToPut]= -parseInt(queensPlaced.length);
        status='remove';
        counter--;
      }
    }
    await AsyncStorage.setItem('queensPlaced', queensPlaced.toString());
    await AsyncStorage.setItem('counter', counter.toString());
    var continueGame = false;
    dispatch({ type: 'placed_all_queens', payload:{end,noThreatens,continueGame,victory,allThreatened}});
    callback(status);
  };
};


export const { Context, Provider } = createDataContext(
    gameReducer,
    {
      setUpGame,
      newGame,
      placeQueen,
      continueGame
    },
    {
      queens              : 3,
      chessboardSize      : 4,
      hasqueenInit        : false,
      end                 : false,
      continueGame        : false,
      noThreatensSquares  : [],
      queensPlaced        : [],
      victory             : false,
      allThreatened       : false
    }
);
