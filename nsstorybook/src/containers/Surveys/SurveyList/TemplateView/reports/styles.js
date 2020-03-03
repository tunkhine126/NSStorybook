import { makeStyles } from '@material-ui/core/styles';
import colors from 'global-styles';

export const styles = makeStyles(() => ({
  divider: { marginBottom: 20, marginTop: 20 },
  chartContainer: { paddingRight: 50, paddingLeft: 40 },
  coordinates: { maxHeight: 40 },
  locationText: { fontWeight: 600, marginTop: 5, marginBottom: 5 },
  pin: {
    cursor: 'pointer',
    fill: '#d00',
    stroke: 'none',
    marginRight: 5,
  },
  pinLinks: {
    color: colors.TEXT.dark,
    textDecoration: 'underline',
    fontSize: 12,
    marginLeft: 20,
    marginBottom: 5,
    '&:hover': {
      color: colors.STATE.active,
    },
  },
  pinIcon: { fontSize: 13, marginBottom: -3 },
  numberType: {
    color: colors.INTERFACE.ui7,
    marginLeft: 40,
    marginBottom: 5,
    fontWeight: 400,
  },
  numberValue: {
    fontWeight: 600,
  },
  root: {
    padding: 20,
    marginRight: 40,
    marginBottom: 30,
    borderRadius: 2,
    boxShadow: 'none',
  },
  question: {
    fontWeight: 400,
    marginTop: 10,
    fontSize: 14,
    color: colors.INTERFACE.ui7,
  },
  questionNumber: {
    width: 24,
    height: 24,
    marginTop: 3,
    borderRadius: 30,
    marginRight: 15,
    border: `1px solid ${colors.INTERFACE.ui3}`,
    textAlign: 'center',
    color: colors.INTERFACE.ui6,
  },
  questionsAnswered: {
    fontSize: 12,
    fontWeight: 500,
    marginTop: 25,
    color: '#ABABB6',
    textAlign: 'end',
  },
  questionTitle: {
    fontSize: 14,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: 1,
    color: colors.INTERFACE.ui6,
  },
  scrollList: {
    backgroundColor: '#F7F7F7',
  },
  textIcon: {
    color: colors.TEXT.normal,
    fontSize: 15,
    '&:hover': {
      color: colors.STATE.active,
    },
  },
  version: {
    fontWeight: 400,
    fontSize: 10,
    textTransform: 'uppercase',
    color: colors.INTERFACE.ui7,
  },
}));

export const photoScrollStyle = makeStyles(() => ({
  container: {
    maxHeight: 400,
    overflow: 'auto',
    paddingLeft: 40,
    paddingRight: 20,
  },
  text: {
    fontSize: 10,
    textDecoration: 'underline',
    color: colors.INTERFACE.ui7,
    '&:hover': {
      color: colors.STATE.active,
    },
  },
  icon: { fontSize: 13, marginBottom: -3, marginRight: 10 },
}));

export const singleChoiceBar = percentage =>
  makeStyles(() => ({
    barTextContainer: { marginTop: -38, paddingLeft: 15, paddingRight: 20 },
    barContainer: {
      backgroundColor: '#FFEBE3',
      display: 'inline-flex',
      height: 39,
    },
    container: {
      marginBottom: 6,
    },
    percentageContainer: {
      minWidth: 45,
    },
    percentageText: { color: '#4E4E56', fontWeight: 700, fontSize: 12 },
    percentageBar: {
      backgroundColor: '#FFC0A7',
      width: `${percentage}%`,
      height: 39,
    },
    responseContainer: { maxWidth: '85%' },
    responseText: { color: '#626262', fontWeight: 700, fontSize: 13 },
    numberOfResponses: { color: '#626262', fontSize: 13 },
  }));
