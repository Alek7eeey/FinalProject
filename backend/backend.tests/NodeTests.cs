using backend.DataAccess.DbPatterns.Interfaces;
using backend.DataAccess.Entity;
using backend.WebNavigator.Services.Service;
using Moq;

namespace backend.tests
{
	[TestClass]
	public class NodeServiceTests
	{
		private Mock<IGenericRepository<Node>> _nodeRepoMock;
		private Mock<IGenericRepository<Entry>> _entryRepoMock;
		private Mock<IUnitOfWork> _unitOfWorkMock;
		private NodeService _nodeService;

		[TestInitialize]
		public void TestInitialize()
		{
			_nodeRepoMock = new Mock<IGenericRepository<Node>>();
			_entryRepoMock = new Mock<IGenericRepository<Entry>>();
			_unitOfWorkMock = new Mock<IUnitOfWork>();

			_unitOfWorkMock.Setup(u => u.Nodes).Returns(_nodeRepoMock.Object);
			_unitOfWorkMock.Setup(u => u.Entries).Returns(_entryRepoMock.Object);

			_nodeService = new NodeService(_unitOfWorkMock.Object);
		}

		[TestMethod]
		public async Task GetNodes_ReturnsAllNodes()
		{
			// Arrange
			var nodes = new List<Node> { new Node(), new Node() };
			_nodeRepoMock.Setup(r => r.GetAll()).ReturnsAsync(nodes);

			// Act
			var result = await _nodeService.GetNodes();

			// Assert
			Assert.AreEqual(nodes.Count, result.Count());
		}

		[TestMethod]
		public async Task AddNode_CreatesNewNode()
		{
			// Arrange
			var newNode = new Node();

			// Act
			var result = await _nodeService.AddNode(newNode);

			// Assert
			_nodeRepoMock.Verify(r => r.Create(newNode), Times.Once);
		}

		[TestMethod]
		public async Task RemoveNode_DeletesNode()
		{
			// Arrange
			var nodeToRemove = new Node();

			// Act
			await _nodeService.RemoveNode(nodeToRemove);

			// Assert
			_nodeRepoMock.Verify(r => r.Delete(It.IsAny<Node>()), Times.AtLeastOnce);
		}
	}

}